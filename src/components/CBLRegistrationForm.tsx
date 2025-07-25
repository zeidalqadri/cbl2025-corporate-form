import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BasketballCourtTracker } from "./BasketballCourtTracker";
import { MobileCourtTracker } from "./MobileCourtTracker";

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string; // company_1 or company_2
  relationshipType: string; // employee, contractor, etc.
}

interface DatabasePlayer {
  id: string;
  player_order: number;
  full_name: string;
  ic_passport: string;
  email: string;
  phone: string;
  affiliation: string;
  relationship_type: string;
}

interface TeamRegistration {
  id: string;
  user_id: string;
  team_name: string;
  company_1: string;
  company_2: string | null;
  payment_file_name: string | null;
  team_registration_players: DatabasePlayer[];
}

const CBLRegistrationForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRegistrationId, setExistingRegistrationId] = useState<string | null>(null);
  
  // Form state
  const [teamName, setTeamName] = useState("");
  const [company1, setCompany1] = useState("");
  const [hasSecondCompany, setHasSecondCompany] = useState(false);
  const [company2, setCompany2] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "", relationshipType: "permanent" }
  ]);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    if (user?.email) {
      const formData = {
        teamName,
        company1,
        hasSecondCompany,
        company2,
        players,
        isValidated,
        paymentFileName: paymentFile?.name || null
      };
      localStorage.setItem('cbl_registration_data', JSON.stringify(formData));
    }
  }, [user, teamName, company1, hasSecondCompany, company2, players, isValidated, paymentFile]);

  // Define loadExistingRegistration function before using it in useEffect
  const loadExistingRegistration = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      // Look for existing registration by user_id
      const { data: registration, error } = await supabase
        .from('team_registrations')
        .select(`
          *,
          team_registration_players(*)
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (registration && !error) {
        setExistingRegistrationId(registration.id);
        setTeamName(registration.team_name);
        setCompany1(registration.company_1);
        setHasSecondCompany(!!registration.company_2);
        setCompany2(registration.company_2 || "");
        
        // Load players
        const playersData = registration.team_registration_players
          .sort((a: DatabasePlayer, b: DatabasePlayer) => a.player_order - b.player_order)
          .map((player: DatabasePlayer, index: number) => ({
            id: (index + 1).toString(),
            fullName: player.full_name,
            icPassport: player.ic_passport,
            email: player.email,
            phone: player.phone,
            affiliation: player.affiliation,
            relationshipType: player.relationship_type || 'permanent'
          }));
        setPlayers(playersData);
        
        // Create a mock file object if payment file exists
        if (registration.payment_file_name) {
          const mockFile = new File([], registration.payment_file_name, { 
            type: 'application/octet-stream' 
          });
          Object.defineProperty(mockFile, 'name', { 
            value: registration.payment_file_name,
            writable: false 
          });
          setPaymentFile(mockFile);
        }
        
        toast({
          title: "Registration loaded",
          description: "We found your existing registration and loaded your data.",
        });
      } else {
        // Load from localStorage if no existing registration
        const savedData = localStorage.getItem('cbl_registration_data');
        if (savedData) {
          const formData = JSON.parse(savedData);
          setTeamName(formData.teamName || "");
          setCompany1(formData.company1 || "");
          setHasSecondCompany(formData.hasSecondCompany || false);
          setCompany2(formData.company2 || "");
          setPlayers(formData.players || [{ id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "", relationshipType: "permanent" }]);
          setIsValidated(formData.isValidated || false);
          
          // Restore payment file name if exists
          if (formData.paymentFileName) {
            const mockFile = new File([], formData.paymentFileName, { 
              type: 'application/octet-stream' 
            });
            Object.defineProperty(mockFile, 'name', { 
              value: formData.paymentFileName,
              writable: false 
            });
            setPaymentFile(mockFile);
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing registration:', error);
    }
  }, [user, toast]);

  // Load existing registration on mount
  useEffect(() => {
    if (user?.email) {
      loadExistingRegistration();
    }
  }, [user, loadExistingRegistration]);

  // Remove email handling functions as we now use authentication

  // Company affiliation options
  const getCompanyOptions = () => {
    const options = [
      { value: "company_1", label: company1 || "Company 1" }
    ];
    
    if (hasSecondCompany && company2) {
      options.push({ value: "company_2", label: company2 });
    }
    
    return options;
  };

  // Relationship type options
  const getRelationshipTypeOptions = () => [
    { value: "permanent", label: "Permanent" },
    { value: "contract", label: "Contract" },
    { value: "intern", label: "Intern" },
    { value: "agent", label: "Agent" },
    { value: "member", label: "Member" }
  ];

  const addPlayer = () => {
    if (players.length < 15) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        fullName: "",
        icPassport: "",
        email: "",
        phone: "",
        affiliation: "",
        relationshipType: "permanent"
      };
      setPlayers([...players, newPlayer]);
    }
  };

  const removePlayer = (id: string) => {
    if (players.length > 1) {
      setPlayers(players.filter(player => player.id !== id));
    }
  };

  const updatePlayer = (id: string, field: keyof Player, value: string) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, [field]: value } : player
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPG, or PNG file",
          variant: "destructive"
        });
        return;
      }
      
      setPaymentFile(file);
    }
  };


  const isFormValid = () => {
    const teamInfoValid = teamName.trim() && company1.trim() && (!hasSecondCompany || company2.trim());
    const completedPlayers = players.filter(player => 
      player.fullName.trim() && 
      player.icPassport.trim() && 
      player.email.trim() && 
      player.phone.trim() && 
      player.affiliation &&
      player.relationshipType
    );
    const playersValid = completedPlayers.length >= 5; // Minimum 5 players required
    const paymentValid = paymentFile !== null;
    
    return teamInfoValid && playersValid && paymentValid && isValidated;
  };

  const uploadPaymentFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('payment-uploads')
      .upload(fileName, file);
    
    if (error) {
      throw error;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('payment-uploads')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Form incomplete",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let registrationId = existingRegistrationId;
      
      if (existingRegistrationId) {
        // Update existing registration
        const paymentFileUrl = paymentFile ? await uploadPaymentFile(paymentFile) : null;
        
        await supabase
          .from('team_registrations')
          .update({
            team_name: teamName,
            company_1: company1,
            company_2: hasSecondCompany ? company2 : null,
            payment_file_url: paymentFileUrl,
            payment_file_name: paymentFile?.name || null,
            total_players: players.length,
            payment_file_size: paymentFile?.size || null 
          })
          .eq('id', existingRegistrationId);

        // Delete existing players and re-insert
        await supabase
          .from('team_registration_players')
          .delete()
          .eq('registration_id', existingRegistrationId);
      } else {
        // Create new registration
        const paymentFileUrl = paymentFile ? await uploadPaymentFile(paymentFile) : null;
        
        const { data: registration, error: regError } = await supabase
          .from('team_registrations')
          .insert({
            team_name: teamName,
            company_1: company1,
            company_2: hasSecondCompany ? company2 : null,
            payment_file_url: paymentFileUrl,
            payment_file_name: paymentFile?.name || null,
            user_id: user?.id
          })
          .select()
          .single();

        if (regError) throw regError;
        registrationId = registration.id;
      }

      // Insert players
      const playersData = players.map((player, index) => ({
        registration_id: registrationId,
        full_name: player.fullName,
        ic_passport: player.icPassport,
        email: player.email,
        phone: player.phone,
        affiliation: player.affiliation,
        relationship_type: player.relationshipType as 'permanent' | 'contract' | 'intern' | 'agent' | 'member',
        player_order: index + 1
      }));

      const { error: playersError } = await supabase
        .from('team_registration_players')
        .insert(playersData);

      if (playersError) throw playersError;

      // Update total players count
      await supabase
        .from('team_registrations')
        .update({ 
          total_players: players.length,
          payment_file_size: paymentFile?.size || null 
        })
        .eq('id', registrationId);

      // Sync to Google Sheets (async, don't wait for completion)
      supabase.functions.invoke('sync-to-google-sheets', {
        body: { registrationId }
      }).catch(error => {
        console.error('Google Sheets sync failed:', error);
        // Don't show error to user, this is background operation
      });

      toast({
        title: existingRegistrationId ? "Registration updated!" : "Registration successful!",
        description: existingRegistrationId 
          ? "Your team registration has been updated for CBL 2025 Corporate Edition"
          : "Your team has been registered for CBL 2025 Corporate Edition",
      });

      // Clear localStorage
      localStorage.removeItem('cbl_registration_data');
      
      // Reset form
      setExistingRegistrationId(null);
      setTeamName("");
      setCompany1("");
      setCompany2("");
      setHasSecondCompany(false);
      setPlayers([{ id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "", relationshipType: "permanent" }]);
      setPaymentFile(null);
      setIsValidated(false);
      
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "There was an error submitting your registration. Please try again.";
      
      // Handle specific database constraint violations
      if (error && typeof error === 'object' && 'message' in error) {
        const errorObj = error as { message: string };
        if (errorObj.message?.includes('valid_email')) {
          errorMessage = "Please check that all email addresses are in valid format (e.g., name@company.com).";
        } else if (errorObj.message?.includes('valid_phone')) {
          errorMessage = "Please check that all phone numbers are in valid format (e.g., +60123456789 or 0123456789).";
        } else if (errorObj.message?.includes('affiliation')) {
          errorMessage = "Player affiliation must match one of the company names.";
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
        }
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/cfe312a1-b4c2-4555-a995-829d97c3bc3d.png" 
              alt="CBL Logo" 
              className="h-32 w-auto drop-shadow-lg mb-2"
            />
            <div className="text-4xl font-bold text-primary mb-4">2025</div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Corporate Edition</h1>
          <p className="text-xl text-muted-foreground">Team Registration Form</p>
          <div className="mt-4 bg-accent/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-foreground">
              🏀 Register your corporate team for Malaysia's premier basketball league! 
              Complete all sections to secure your spot in CBL 2025.
            </p>
          </div>
          
          {existingRegistrationId && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                ✏️ You're editing an existing registration. Any changes will update your current submission.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Team Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Tech Innovators FC"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="company1">Company Name *</Label>
                <Input
                  id="company1"
                  value={company1}
                  onChange={(e) => setCompany1(e.target.value)}
                  placeholder="e.g., Microsoft Malaysia Sdn Bhd"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="secondCompany"
                  checked={hasSecondCompany}
                  onCheckedChange={(checked) => {
                    setHasSecondCompany(checked as boolean);
                    if (!checked) setCompany2("");
                  }}
                />
                <Label htmlFor="secondCompany">
                  Add second company (for SME partnerships)
                </Label>
              </div>

              {hasSecondCompany && (
                <div>
                  <Label htmlFor="company2">Second Company Name *</Label>
                  <Input
                    id="company2"
                    value={company2}
                    onChange={(e) => setCompany2(e.target.value)}
                    placeholder="e.g., Google Malaysia Sdn Bhd"
                    required={hasSecondCompany}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Player Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Player Details ({players.filter(p => p.fullName.trim()).length}/15)
                <span className="text-sm font-normal text-muted-foreground">
                  (Minimum 5 required)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {players.map((player, index) => (
                <div key={player.id} id={`player-${player.id}`} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Player {index + 1}</h4>
                    {players.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePlayer(player.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`fullName-${player.id}`}>Full Name *</Label>
                      <Input
                        id={`fullName-${player.id}`}
                        value={player.fullName}
                        onChange={(e) => updatePlayer(player.id, 'fullName', e.target.value)}
                        placeholder="e.g., Ahmad bin Ali"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`icPassport-${player.id}`}>IC/Passport Number *</Label>
                      <Input
                        id={`icPassport-${player.id}`}
                        value={player.icPassport}
                        onChange={(e) => updatePlayer(player.id, 'icPassport', e.target.value)}
                        placeholder="e.g., 990123-01-1234 or A12345678"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`email-${player.id}`}>Email *</Label>
                      <Input
                        id={`email-${player.id}`}
                        type="email"
                        value={player.email}
                        onChange={(e) => updatePlayer(player.id, 'email', e.target.value)}
                        placeholder="e.g., ahmad.ali@company.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`phone-${player.id}`}>Phone Number *</Label>
                      <Input
                        id={`phone-${player.id}`}
                        value={player.phone}
                        onChange={(e) => updatePlayer(player.id, 'phone', e.target.value)}
                        placeholder="e.g., +60123456789 or 0123456789"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`affiliation-${player.id}`}>Company Affiliation *</Label>
                      <Select
                        value={player.affiliation}
                        onValueChange={(value) => updatePlayer(player.id, 'affiliation', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCompanyOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`relationshipType-${player.id}`}>Relationship Type *</Label>
                      <Select
                        value={player.relationshipType}
                        onValueChange={(value) => updatePlayer(player.id, 'relationshipType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship type" />
                        </SelectTrigger>
                        <SelectContent>
                          {getRelationshipTypeOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              
              {players.length < 15 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPlayer}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              )}
              
              {/* Player count status */}
              <div className="mt-4 p-3 rounded-lg bg-muted">
                <p className="text-sm">
                  {(() => {
                    const completedCount = players.filter(p => p.fullName.trim()).length;
                    if (completedCount < 5) {
                      return (
                        <span className="text-amber-600">
                          ⚠️ You need at least 5 completed players to submit ({completedCount}/5)
                        </span>
                      );
                    } else {
                      return (
                        <span className="text-green-600">
                          ✅ Player minimum met ({completedCount}/15)
                        </span>
                      );
                    }
                  })()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Payment Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Payment Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paymentFile">Payment Receipt/Proof *</Label>
                <div className="mt-2">
                  <input
                    id="paymentFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('paymentFile')?.click()}
                    className="w-full h-24 border-dashed"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm">
                        {paymentFile ? 'Change file' : 'Upload payment proof'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG (max 10MB)
                      </p>
                    </div>
                  </Button>
                </div>
                
                {paymentFile && (
                  <div className="mt-4 p-3 bg-muted rounded-lg flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{paymentFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(paymentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Confirmation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="validation"
                  checked={isValidated}
                  onCheckedChange={(checked) => setIsValidated(checked as boolean)}
                />
                <Label htmlFor="validation" className="text-sm leading-relaxed">
                  I confirm that all information provided is accurate and complete. I understand that 
                  false information may lead to disqualification from the CBL 2025 Corporate Edition.
                </Label>
              </div>
              
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid() || isSubmitting}
                  size="lg"
                >
                  {isSubmitting 
                    ? (existingRegistrationId ? "Updating..." : "Submitting...") 
                    : (existingRegistrationId ? "Update Registration" : "Submit Registration")
                  }
                </Button>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Desktop Basketball Court Tracker */}
      <BasketballCourtTracker
        players={players}
        teamName={teamName}
        company1={company1}
        company2={company2}
        hasSecondCompany={hasSecondCompany}
        paymentUploaded={!!paymentFile}
        isValidated={isValidated}
        onPlayerClick={(playerId) => {
          // Scroll to player form
          const playerElement = document.getElementById(`player-${playerId}`);
          if (playerElement) {
            playerElement.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
      />

      {/* Mobile Basketball Court Tracker */}
      <MobileCourtTracker
        players={players}
        teamName={teamName}
        company1={company1}
        company2={company2}
        hasSecondCompany={hasSecondCompany}
        paymentUploaded={!!paymentFile}
        isValidated={isValidated}
      />
    </div>
  );
};

export default CBLRegistrationForm;
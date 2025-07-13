import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Upload, FileText, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string;
}

const CBLRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Email collection step
  const [step, setStep] = useState<'email' | 'form'>('email');
  const [userEmail, setUserEmail] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [existingRegistrationId, setExistingRegistrationId] = useState<string | null>(null);
  
  // Form state
  const [teamName, setTeamName] = useState("");
  const [company1, setCompany1] = useState("");
  const [hasSecondCompany, setHasSecondCompany] = useState(false);
  const [company2, setCompany2] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "" }
  ]);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  // Load data from session storage
  useEffect(() => {
    const savedEmail = localStorage.getItem('cbl_registration_email');
    if (savedEmail) {
      setUserEmail(savedEmail);
      setStep('form');
      loadExistingRegistration(savedEmail);
    }
  }, []);

  // Save to session storage whenever form data changes
  useEffect(() => {
    if (step === 'form' && userEmail) {
      const formData = {
        userEmail,
        teamName,
        company1,
        hasSecondCompany,
        company2,
        players,
        isValidated
      };
      localStorage.setItem('cbl_registration_data', JSON.stringify(formData));
    }
  }, [step, userEmail, teamName, company1, hasSecondCompany, company2, players, isValidated]);

  const loadExistingRegistration = async (email: string) => {
    try {
      // First, find if there's a player with this email
      const { data: playerData, error: playerError } = await supabase
        .from('team_registration_players')
        .select('registration_id')
        .eq('email', email)
        .limit(1)
        .single();

      if (playerData && !playerError) {
        // Get the full registration with all players
        const { data: registration, error } = await supabase
          .from('team_registrations')
          .select(`
            *,
            team_registration_players(*)
          `)
          .eq('id', playerData.registration_id)
          .single();

        if (registration && !error) {
          setExistingRegistrationId(registration.id);
          setTeamName(registration.team_name);
          setCompany1(registration.company_1);
          setHasSecondCompany(!!registration.company_2);
          setCompany2(registration.company_2 || "");
          
          // Load players
          const playersData = registration.team_registration_players.map((player: any, index: number) => ({
            id: (index + 1).toString(),
            fullName: player.full_name,
            icPassport: player.ic_passport,
            email: player.email,
            phone: player.phone,
            affiliation: player.affiliation
          }));
          setPlayers(playersData);
          
          toast({
            title: "Registration loaded",
            description: "We found your existing registration and loaded your data.",
          });
        }
      } else {
        // Load from session storage if no existing registration
        const savedData = localStorage.getItem('cbl_registration_data');
        if (savedData) {
          const formData = JSON.parse(savedData);
          if (formData.userEmail === email) {
            setTeamName(formData.teamName || "");
            setCompany1(formData.company1 || "");
            setHasSecondCompany(formData.hasSecondCompany || false);
            setCompany2(formData.company2 || "");
            setPlayers(formData.players || [{ id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "" }]);
            setIsValidated(formData.isValidated || false);
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing registration:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsCheckingEmail(true);
    localStorage.setItem('cbl_registration_email', userEmail);
    
    await loadExistingRegistration(userEmail);
    setStep('form');
    setIsCheckingEmail(false);
  };

  const backToEmail = () => {
    setStep('email');
    localStorage.removeItem('cbl_registration_email');
    localStorage.removeItem('cbl_registration_data');
  };

  // Dynamic affiliation options based on companies
  const getAffiliationOptions = () => {
    const options = [
      { value: "company_1", label: `${company1 || "Company 1"} Employee` }
    ];
    
    if (hasSecondCompany && company2) {
      options.push({ value: "company_2", label: `${company2} Employee` });
    }
    
    return options;
  };

  const addPlayer = () => {
    if (players.length < 15) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        fullName: "",
        icPassport: "",
        email: "",
        phone: "",
        affiliation: ""
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
    const playersValid = players.every(player => 
      player.fullName.trim() && 
      player.icPassport.trim() && 
      player.email.trim() && 
      player.phone.trim() && 
      player.affiliation
    );
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
            payment_file_name: paymentFile?.name || null
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

      // Clear session storage
      localStorage.removeItem('cbl_registration_email');
      localStorage.removeItem('cbl_registration_data');
      
      // Reset form
      setStep('email');
      setUserEmail("");
      setExistingRegistrationId(null);
      setTeamName("");
      setCompany1("");
      setCompany2("");
      setHasSecondCompany(false);
      setPlayers([{ id: "1", fullName: "", icPassport: "", email: "", phone: "", affiliation: "" }]);
      setPaymentFile(null);
      setIsValidated(false);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Registration failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'email') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              <img 
                src="/lovable-uploads/cfe312a1-b4c2-4555-a995-829d97c3bc3d.png" 
                alt="CBL Corporate Basketball League Logo" 
                className="h-32 w-auto drop-shadow-lg mb-2"
              />
              <div className="text-4xl font-bold text-primary mb-4">2025</div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Corporate Edition</h1>
            <p className="text-xl text-muted-foreground">Team Registration</p>
          </div>

          {/* Email Collection Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6" />
                Get Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="userEmail">Email Address *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll use this email to save your progress and allow you to return to complete 
                    your registration later. If you have an existing registration, we'll load it for you.
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!userEmail.trim() || isCheckingEmail}
                >
                  {isCheckingEmail ? "Checking..." : "Continue to Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/cfe312a1-b4c2-4555-a995-829d97c3bc3d.png" 
              alt="CBL Corporate Basketball League Logo" 
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
          
          {/* Email info and back button */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Registration for: {userEmail}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={backToEmail}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Change Email
            </Button>
          </div>
          
          {existingRegistrationId && (
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
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
                  placeholder="Enter your team name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="company1">Company Name *</Label>
                <Input
                  id="company1"
                  value={company1}
                  onChange={(e) => setCompany1(e.target.value)}
                  placeholder="Enter your company name"
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
                    placeholder="Enter second company name"
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
                Player Details ({players.length}/15)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {players.map((player, index) => (
                <div key={player.id} className="p-4 border border-border rounded-lg space-y-4">
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
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`icPassport-${player.id}`}>IC/Passport Number *</Label>
                      <Input
                        id={`icPassport-${player.id}`}
                        value={player.icPassport}
                        onChange={(e) => updatePlayer(player.id, 'icPassport', e.target.value)}
                        placeholder="Enter IC or passport number"
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
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`phone-${player.id}`}>Phone Number *</Label>
                      <Input
                        id={`phone-${player.id}`}
                        value={player.phone}
                        onChange={(e) => updatePlayer(player.id, 'phone', e.target.value)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor={`affiliation-${player.id}`}>Affiliation *</Label>
                      <Select
                        value={player.affiliation}
                        onValueChange={(value) => updatePlayer(player.id, 'affiliation', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select player affiliation" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAffiliationOptions().map((option) => (
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
    </div>
  );
};

export default CBLRegistrationForm;
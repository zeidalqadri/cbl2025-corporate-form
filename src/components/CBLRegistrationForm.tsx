import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Upload, FileText } from "lucide-react";
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

  const affiliationOptions = [
    "Company 1 Employee",
    "Company 2 Employee", 
    "External Player",
    "Contractor",
    "Partner"
  ];

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
      // Upload payment file
      const paymentFileUrl = paymentFile ? await uploadPaymentFile(paymentFile) : null;
      
      // Insert team registration
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

      // Insert players
      const playersData = players.map(player => ({
        team_registration_id: registration.id,
        full_name: player.fullName,
        ic_passport: player.icPassport,
        email: player.email,
        phone: player.phone,
        affiliation: player.affiliation
      }));

      const { error: playersError } = await supabase
        .from('team_registration_players')
        .insert(playersData);

      if (playersError) throw playersError;

      toast({
        title: "Registration successful!",
        description: "Your team has been registered for CBL 2025 Corporate Edition",
      });

      // Reset form
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/2a6a1d65-1493-45a0-a60a-d8672698ba40.png" 
            alt="CBL Logo" 
            className="mx-auto mb-6 h-24 w-auto"
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">CBL 2025 Corporate Edition</h1>
          <p className="text-xl text-muted-foreground">Team Registration Form</p>
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
                          {affiliationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CBLRegistrationForm;
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      advanced_player_stats: {
        Row: {
          court_position_data: Json | null
          created_at: string | null
          defensive_rating: number | null
          effective_field_goal_percentage: number | null
          game_id: string | null
          id: string
          offensive_rating: number | null
          pace: number | null
          performance_trend: Json | null
          player_efficiency_rating: number | null
          player_id: string | null
          season_id: string | null
          shot_chart_data: Json | null
          true_shooting_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          court_position_data?: Json | null
          created_at?: string | null
          defensive_rating?: number | null
          effective_field_goal_percentage?: number | null
          game_id?: string | null
          id?: string
          offensive_rating?: number | null
          pace?: number | null
          performance_trend?: Json | null
          player_efficiency_rating?: number | null
          player_id?: string | null
          season_id?: string | null
          shot_chart_data?: Json | null
          true_shooting_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          court_position_data?: Json | null
          created_at?: string | null
          defensive_rating?: number | null
          effective_field_goal_percentage?: number | null
          game_id?: string | null
          id?: string
          offensive_rating?: number | null
          pace?: number | null
          performance_trend?: Json | null
          player_efficiency_rating?: number | null
          player_id?: string | null
          season_id?: string | null
          shot_chart_data?: Json | null
          true_shooting_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "advanced_player_stats_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advanced_player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advanced_player_stats_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          age_group: string | null
          competition_type: string
          created_at: string | null
          end_date: string | null
          format: string | null
          gender: string | null
          id: string
          max_teams: number | null
          name: string
          prize_pool: number | null
          ranking_positions: Json | null
          registration_deadline: string | null
          registration_fee: number | null
          rules_document_url: string | null
          season_year: number | null
          sponsor_name: string | null
          start_date: string | null
          tournament_tier: string | null
        }
        Insert: {
          age_group?: string | null
          competition_type: string
          created_at?: string | null
          end_date?: string | null
          format?: string | null
          gender?: string | null
          id?: string
          max_teams?: number | null
          name: string
          prize_pool?: number | null
          ranking_positions?: Json | null
          registration_deadline?: string | null
          registration_fee?: number | null
          rules_document_url?: string | null
          season_year?: number | null
          sponsor_name?: string | null
          start_date?: string | null
          tournament_tier?: string | null
        }
        Update: {
          age_group?: string | null
          competition_type?: string
          created_at?: string | null
          end_date?: string | null
          format?: string | null
          gender?: string | null
          id?: string
          max_teams?: number | null
          name?: string
          prize_pool?: number | null
          ranking_positions?: Json | null
          registration_deadline?: string | null
          registration_fee?: number | null
          rules_document_url?: string | null
          season_year?: number | null
          sponsor_name?: string | null
          start_date?: string | null
          tournament_tier?: string | null
        }
        Relationships: []
      }
      data_processing_activities: {
        Row: {
          activity_name: string
          created_at: string | null
          data_categories: string[] | null
          data_subjects: string[] | null
          id: string
          international_transfers: Json | null
          last_reviewed: string | null
          legal_basis: string | null
          next_review_date: string | null
          organization_id: string | null
          purpose: string
          recipients: string[] | null
          retention_period: number | null
          risk_assessment: Json | null
          security_measures: string[] | null
          updated_at: string | null
        }
        Insert: {
          activity_name: string
          created_at?: string | null
          data_categories?: string[] | null
          data_subjects?: string[] | null
          id?: string
          international_transfers?: Json | null
          last_reviewed?: string | null
          legal_basis?: string | null
          next_review_date?: string | null
          organization_id?: string | null
          purpose: string
          recipients?: string[] | null
          retention_period?: number | null
          risk_assessment?: Json | null
          security_measures?: string[] | null
          updated_at?: string | null
        }
        Update: {
          activity_name?: string
          created_at?: string | null
          data_categories?: string[] | null
          data_subjects?: string[] | null
          id?: string
          international_transfers?: Json | null
          last_reviewed?: string | null
          legal_basis?: string | null
          next_review_date?: string | null
          organization_id?: string | null
          purpose?: string
          recipients?: string[] | null
          retention_period?: number | null
          risk_assessment?: Json | null
          security_measures?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_processing_activities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      data_subject_requests: {
        Row: {
          assigned_to: string | null
          completion_date: string | null
          created_at: string | null
          id: string
          priority: string | null
          request_date: string | null
          request_details: string
          request_type: string
          response_details: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          priority?: string | null
          request_date?: string | null
          request_details: string
          request_type: string
          response_details?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          priority?: string | null
          request_date?: string | null
          request_details?: string
          request_type?: string
          response_details?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_subject_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_subject_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_subject_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_subject_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
        ]
      }
      educational_institutions: {
        Row: {
          address: string | null
          basketball_history: Json | null
          city: string | null
          coordinates: unknown | null
          created_at: string | null
          facilities_rating: number | null
          id: string
          mss_code: string | null
          name: string
          postal_code: string | null
          principal_name: string | null
          school_category: string | null
          sports_coordinator: string | null
          state: string | null
          type: string
        }
        Insert: {
          address?: string | null
          basketball_history?: Json | null
          city?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          facilities_rating?: number | null
          id?: string
          mss_code?: string | null
          name: string
          postal_code?: string | null
          principal_name?: string | null
          school_category?: string | null
          sports_coordinator?: string | null
          state?: string | null
          type: string
        }
        Update: {
          address?: string | null
          basketball_history?: Json | null
          city?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          facilities_rating?: number | null
          id?: string
          mss_code?: string | null
          name?: string
          postal_code?: string | null
          principal_name?: string | null
          school_category?: string | null
          sports_coordinator?: string | null
          state?: string | null
          type?: string
        }
        Relationships: []
      }
      game_events: {
        Row: {
          assist_player_id: string | null
          created_at: string | null
          event_subtype: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          game_id: string
          game_time: string | null
          id: string
          notes: string | null
          opponent_player_id: string | null
          period: number
          player_id: string | null
          points_value: number | null
          position_x: number | null
          position_y: number | null
          referee_id: string | null
          success: boolean | null
          team_id: string | null
          verified: boolean | null
          video_timestamp: number | null
        }
        Insert: {
          assist_player_id?: string | null
          created_at?: string | null
          event_subtype?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          game_id: string
          game_time?: string | null
          id?: string
          notes?: string | null
          opponent_player_id?: string | null
          period: number
          player_id?: string | null
          points_value?: number | null
          position_x?: number | null
          position_y?: number | null
          referee_id?: string | null
          success?: boolean | null
          team_id?: string | null
          verified?: boolean | null
          video_timestamp?: number | null
        }
        Update: {
          assist_player_id?: string | null
          created_at?: string | null
          event_subtype?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          game_id?: string
          game_time?: string | null
          id?: string
          notes?: string | null
          opponent_player_id?: string | null
          period?: number
          player_id?: string | null
          points_value?: number | null
          position_x?: number | null
          position_y?: number | null
          referee_id?: string | null
          success?: boolean | null
          team_id?: string | null
          verified?: boolean | null
          video_timestamp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_events_assist_player_id_fkey"
            columns: ["assist_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_opponent_player_id_fkey"
            columns: ["opponent_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      game_state: {
        Row: {
          away_score: number | null
          away_team_fouls: number | null
          away_timeouts_remaining: number | null
          clock_running: boolean | null
          current_period: number
          game_id: string
          game_status: string | null
          home_score: number | null
          home_team_fouls: number | null
          home_timeouts_remaining: number | null
          last_event_id: string | null
          period_start_time: string | null
          period_time_remaining: number | null
          possession_team_id: string | null
          referee_1_id: string | null
          referee_2_id: string | null
          scorekeeper_id: string | null
          updated_at: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_fouls?: number | null
          away_timeouts_remaining?: number | null
          clock_running?: boolean | null
          current_period?: number
          game_id: string
          game_status?: string | null
          home_score?: number | null
          home_team_fouls?: number | null
          home_timeouts_remaining?: number | null
          last_event_id?: string | null
          period_start_time?: string | null
          period_time_remaining?: number | null
          possession_team_id?: string | null
          referee_1_id?: string | null
          referee_2_id?: string | null
          scorekeeper_id?: string | null
          updated_at?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_fouls?: number | null
          away_timeouts_remaining?: number | null
          clock_running?: boolean | null
          current_period?: number
          game_id?: string
          game_status?: string | null
          home_score?: number | null
          home_team_fouls?: number | null
          home_timeouts_remaining?: number | null
          last_event_id?: string | null
          period_start_time?: string | null
          period_time_remaining?: number | null
          possession_team_id?: string | null
          referee_1_id?: string | null
          referee_2_id?: string | null
          scorekeeper_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_state_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_last_event_id_fkey"
            columns: ["last_event_id"]
            isOneToOne: false
            referencedRelation: "game_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_possession_team_id_fkey"
            columns: ["possession_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_referee_1_id_fkey"
            columns: ["referee_1_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_referee_1_id_fkey"
            columns: ["referee_1_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_referee_2_id_fkey"
            columns: ["referee_2_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_referee_2_id_fkey"
            columns: ["referee_2_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_scorekeeper_id_fkey"
            columns: ["scorekeeper_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_state_scorekeeper_id_fkey"
            columns: ["scorekeeper_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          away_score: number | null
          away_team_id: string | null
          competition_id: string | null
          created_at: string | null
          current_period: number | null
          game_code: string | null
          game_stats: Json | null
          home_score: number | null
          home_team_id: string | null
          id: string
          incidents: Json | null
          period_time_remaining: number | null
          referee_notes: string | null
          scheduled_time: string
          status: Database["public"]["Enums"]["game_status"] | null
          updated_at: string | null
          venue_id: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          current_period?: number | null
          game_code?: string | null
          game_stats?: Json | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          incidents?: Json | null
          period_time_remaining?: number | null
          referee_notes?: string | null
          scheduled_time: string
          status?: Database["public"]["Enums"]["game_status"] | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          current_period?: number | null
          game_code?: string | null
          game_stats?: Json | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          incidents?: Json | null
          period_time_remaining?: number | null
          referee_notes?: string | null
          scheduled_time?: string
          status?: Database["public"]["Enums"]["game_status"] | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          court: string | null
          created_at: string | null
          id: string
          match_number: number | null
          round: number | null
          start_time: string | null
          status: string | null
          team1_id: string | null
          team1_score: number | null
          team2_id: string | null
          team2_score: number | null
          tournament_id: string | null
        }
        Insert: {
          court?: string | null
          created_at?: string | null
          id?: string
          match_number?: number | null
          round?: number | null
          start_time?: string | null
          status?: string | null
          team1_id?: string | null
          team1_score?: number | null
          team2_id?: string | null
          team2_score?: number | null
          tournament_id?: string | null
        }
        Update: {
          court?: string | null
          created_at?: string | null
          id?: string
          match_number?: number | null
          round?: number | null
          start_time?: string | null
          status?: string | null
          team1_id?: string | null
          team1_score?: number | null
          team2_id?: string | null
          team2_score?: number | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          priority: Database["public"]["Enums"]["notification_priority"] | null
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          coordinates: unknown | null
          created_at: string | null
          id: string
          name: string
          org_identifier: string | null
          org_identifier_type:
            | Database["public"]["Enums"]["org_identifier_type"]
            | null
          postal_code: string | null
          state: string | null
          type: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          name: string
          org_identifier?: string | null
          org_identifier_type?:
            | Database["public"]["Enums"]["org_identifier_type"]
            | null
          postal_code?: string | null
          state?: string | null
          type: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          name?: string
          org_identifier?: string | null
          org_identifier_type?:
            | Database["public"]["Enums"]["org_identifier_type"]
            | null
          postal_code?: string | null
          state?: string | null
          type?: string
          website_url?: string | null
        }
        Relationships: []
      }
      pdpa_consents: {
        Row: {
          consent_method: string | null
          consent_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          legal_basis: string | null
          purpose: string
          status: string | null
          timestamp: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          withdrawal_date: string | null
          withdrawal_reason: string | null
        }
        Insert: {
          consent_method?: string | null
          consent_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          purpose: string
          status?: string | null
          timestamp?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
        }
        Update: {
          consent_method?: string | null
          consent_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          purpose?: string
          status?: string | null
          timestamp?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdpa_consents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pdpa_consents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
        ]
      }
      pdpa_settings: {
        Row: {
          audit_settings: Json | null
          breach_notification_settings: Json | null
          consent_management: Json | null
          created_at: string | null
          cross_border_transfer_settings: Json | null
          data_protection_officer: Json | null
          id: string
          malaysian_compliance_settings: Json | null
          organization_id: string | null
          retention_policies: Json | null
          updated_at: string | null
        }
        Insert: {
          audit_settings?: Json | null
          breach_notification_settings?: Json | null
          consent_management?: Json | null
          created_at?: string | null
          cross_border_transfer_settings?: Json | null
          data_protection_officer?: Json | null
          id?: string
          malaysian_compliance_settings?: Json | null
          organization_id?: string | null
          retention_policies?: Json | null
          updated_at?: string | null
        }
        Update: {
          audit_settings?: Json | null
          breach_notification_settings?: Json | null
          consent_management?: Json | null
          created_at?: string | null
          cross_border_transfer_settings?: Json | null
          data_protection_officer?: Json | null
          id?: string
          malaysian_compliance_settings?: Json | null
          organization_id?: string | null
          retention_policies?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdpa_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      player_season_stats: {
        Row: {
          assists_per_game: number | null
          assists_total: number | null
          blocks_total: number | null
          created_at: string | null
          field_goals_attempted: number | null
          field_goals_made: number | null
          fouls_total: number | null
          free_throws_attempted: number | null
          free_throws_made: number | null
          games_played: number | null
          id: string
          minutes_played: number | null
          player_id: string
          points_per_game: number | null
          points_total: number | null
          rebounds_per_game: number | null
          rebounds_total: number | null
          season_id: string
          steals_total: number | null
          team_id: string
          three_pointers_attempted: number | null
          three_pointers_made: number | null
          turnovers_total: number | null
          updated_at: string | null
        }
        Insert: {
          assists_per_game?: number | null
          assists_total?: number | null
          blocks_total?: number | null
          created_at?: string | null
          field_goals_attempted?: number | null
          field_goals_made?: number | null
          fouls_total?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          games_played?: number | null
          id?: string
          minutes_played?: number | null
          player_id: string
          points_per_game?: number | null
          points_total?: number | null
          rebounds_per_game?: number | null
          rebounds_total?: number | null
          season_id: string
          steals_total?: number | null
          team_id: string
          three_pointers_attempted?: number | null
          three_pointers_made?: number | null
          turnovers_total?: number | null
          updated_at?: string | null
        }
        Update: {
          assists_per_game?: number | null
          assists_total?: number | null
          blocks_total?: number | null
          created_at?: string | null
          field_goals_attempted?: number | null
          field_goals_made?: number | null
          fouls_total?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          games_played?: number | null
          id?: string
          minutes_played?: number | null
          player_id?: string
          points_per_game?: number | null
          points_total?: number | null
          rebounds_per_game?: number | null
          rebounds_total?: number | null
          season_id?: string
          steals_total?: number | null
          team_id?: string
          three_pointers_attempted?: number | null
          three_pointers_made?: number | null
          turnovers_total?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_season_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_season_stats_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_season_stats_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          assists: number | null
          blocks: number | null
          created_at: string | null
          field_goals_attempted: number | null
          field_goals_made: number | null
          fouls: number | null
          free_throws_attempted: number | null
          free_throws_made: number | null
          game_id: string | null
          id: string
          minutes_played: number | null
          player_id: string | null
          plus_minus: number | null
          points: number | null
          rebounds: number | null
          season_id: string | null
          steals: number | null
          three_points_attempted: number | null
          three_points_made: number | null
          turnovers: number | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          blocks?: number | null
          created_at?: string | null
          field_goals_attempted?: number | null
          field_goals_made?: number | null
          fouls?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          game_id?: string | null
          id?: string
          minutes_played?: number | null
          player_id?: string | null
          plus_minus?: number | null
          points?: number | null
          rebounds?: number | null
          season_id?: string | null
          steals?: number | null
          three_points_attempted?: number | null
          three_points_made?: number | null
          turnovers?: number | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          blocks?: number | null
          created_at?: string | null
          field_goals_attempted?: number | null
          field_goals_made?: number | null
          fouls?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          game_id?: string | null
          id?: string
          minutes_played?: number | null
          player_id?: string | null
          plus_minus?: number | null
          points?: number | null
          rebounds?: number | null
          season_id?: string | null
          steals?: number | null
          three_points_attempted?: number | null
          three_points_made?: number | null
          turnovers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string | null
          current_team_id: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          height_cm: number | null
          id: string
          jersey_number: number | null
          medical_conditions: string | null
          position: string | null
          skill_level: string | null
          user_id: string | null
          weight_kg: number | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          current_team_id?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          medical_conditions?: string | null
          position?: string | null
          skill_level?: string | null
          user_id?: string | null
          weight_kg?: number | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          current_team_id?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          medical_conditions?: string | null
          position?: string | null
          skill_level?: string | null
          user_id?: string | null
          weight_kg?: number | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_current_team_id_fkey"
            columns: ["current_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_masked"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_current: boolean | null
          name: string
          start_date: string
          year: number
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_current?: boolean | null
          name: string
          start_date: string
          year: number
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_current?: boolean | null
          name?: string
          start_date?: string
          year?: number
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      survey_submissions: {
        Row: {
          available_facilities: string[] | null
          basketball_background: string
          biggest_challenges: string[] | null
          comments: string | null
          created_at: string
          current_basketball: string
          email: string
          full_name: string
          gender: string
          id: string
          phone: string
          primary_role: string
          school: string
          student_ages: string[] | null
          years_teaching: string
        }
        Insert: {
          available_facilities?: string[] | null
          basketball_background: string
          biggest_challenges?: string[] | null
          comments?: string | null
          created_at?: string
          current_basketball: string
          email: string
          full_name: string
          gender: string
          id?: string
          phone: string
          primary_role: string
          school: string
          student_ages?: string[] | null
          years_teaching: string
        }
        Update: {
          available_facilities?: string[] | null
          basketball_background?: string
          biggest_challenges?: string[] | null
          comments?: string | null
          created_at?: string
          current_basketball?: string
          email?: string
          full_name?: string
          gender?: string
          id?: string
          phone?: string
          primary_role?: string
          school?: string
          student_ages?: string[] | null
          years_teaching?: string
        }
        Relationships: []
      }
      team_registration_players: {
        Row: {
          affiliation: string
          created_at: string
          email: string
          full_name: string
          ic_passport: string
          id: string
          phone: string
          player_order: number
          registration_id: string
          relationship_type: Database["public"]["Enums"]["affiliation_type"]
        }
        Insert: {
          affiliation: string
          created_at?: string
          email: string
          full_name: string
          ic_passport: string
          id?: string
          phone: string
          player_order: number
          registration_id: string
          relationship_type?: Database["public"]["Enums"]["affiliation_type"]
        }
        Update: {
          affiliation?: string
          created_at?: string
          email?: string
          full_name?: string
          ic_passport?: string
          id?: string
          phone?: string
          player_order?: number
          registration_id?: string
          relationship_type?: Database["public"]["Enums"]["affiliation_type"]
        }
        Relationships: [
          {
            foreignKeyName: "team_registration_players_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "team_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      team_registrations: {
        Row: {
          company_1: string
          company_2: string | null
          created_at: string
          google_sheet_synced: boolean | null
          has_second_company: boolean | null
          id: string
          payment_file_name: string | null
          payment_file_size: number | null
          payment_file_url: string | null
          status: string | null
          team_name: string
          total_players: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_1: string
          company_2?: string | null
          created_at?: string
          google_sheet_synced?: boolean | null
          has_second_company?: boolean | null
          id?: string
          payment_file_name?: string | null
          payment_file_size?: number | null
          payment_file_url?: string | null
          status?: string | null
          team_name: string
          total_players?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_1?: string
          company_2?: string | null
          created_at?: string
          google_sheet_synced?: boolean | null
          has_second_company?: boolean | null
          id?: string
          payment_file_name?: string | null
          payment_file_size?: number | null
          payment_file_url?: string | null
          status?: string | null
          team_name?: string
          total_players?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          age_group: string | null
          coach_contact: string | null
          coach_name: string | null
          created_at: string | null
          established_year: number | null
          gender: string | null
          id: string
          institution_id: string | null
          logo_url: string | null
          name: string
          organization_id: string | null
          short_name: string | null
          team_colors: Json | null
          tournament_id: string | null
        }
        Insert: {
          age_group?: string | null
          coach_contact?: string | null
          coach_name?: string | null
          created_at?: string | null
          established_year?: number | null
          gender?: string | null
          id?: string
          institution_id?: string | null
          logo_url?: string | null
          name: string
          organization_id?: string | null
          short_name?: string | null
          team_colors?: Json | null
          tournament_id?: string | null
        }
        Update: {
          age_group?: string | null
          coach_contact?: string | null
          coach_name?: string | null
          created_at?: string | null
          established_year?: number | null
          gender?: string | null
          id?: string
          institution_id?: string | null
          logo_url?: string | null
          name?: string
          organization_id?: string | null
          short_name?: string | null
          team_colors?: Json | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "educational_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          category: string | null
          created_at: string | null
          end_date: string | null
          format: string | null
          gender: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          venue: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          end_date?: string | null
          format?: string | null
          gender?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          venue?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          end_date?: string | null
          format?: string | null
          gender?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          district: string | null
          email: string
          first_name: string | null
          gender: string | null
          ic_number: string | null
          id: string
          last_name: string | null
          nric: string | null
          phone: string | null
          preferred_language: string | null
          profile_picture_url: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          district?: string | null
          email: string
          first_name?: string | null
          gender?: string | null
          ic_number?: string | null
          id?: string
          last_name?: string | null
          nric?: string | null
          phone?: string | null
          preferred_language?: string | null
          profile_picture_url?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          district?: string | null
          email?: string
          first_name?: string | null
          gender?: string | null
          ic_number?: string | null
          id?: string
          last_name?: string | null
          nric?: string | null
          phone?: string | null
          preferred_language?: string | null
          profile_picture_url?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      venues: {
        Row: {
          address: string | null
          booking_info: string | null
          capacity: number | null
          city: string | null
          contact_person: string | null
          contact_phone: string | null
          coordinates: unknown | null
          court_type: string | null
          created_at: string | null
          facilities: Json | null
          id: string
          name: string
          postal_code: string | null
          state: string | null
          surface_type: string | null
        }
        Insert: {
          address?: string | null
          booking_info?: string | null
          capacity?: number | null
          city?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          court_type?: string | null
          created_at?: string | null
          facilities?: Json | null
          id?: string
          name: string
          postal_code?: string | null
          state?: string | null
          surface_type?: string | null
        }
        Update: {
          address?: string | null
          booking_info?: string | null
          capacity?: number | null
          city?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          court_type?: string | null
          created_at?: string | null
          facilities?: Json | null
          id?: string
          name?: string
          postal_code?: string | null
          state?: string | null
          surface_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      users_masked: {
        Row: {
          birth_date: string | null
          birth_state: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string | null
          last_name: string | null
          nric_masked: string | null
          preferred_language: string | null
          updated_at: string | null
        }
        Insert: {
          birth_date?: never
          birth_state?: never
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: never
          id?: string | null
          last_name?: string | null
          nric_masked?: never
          preferred_language?: string | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: never
          birth_state?: never
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: never
          id?: string | null
          last_name?: string | null
          nric_masked?: never
          preferred_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      clean_price: {
        Args: { price_str: string }
        Returns: number
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mask_nric: {
        Args: { nric: string }
        Returns: string
      }
      nric_birth_date: {
        Args: { nric: string }
        Returns: string
      }
      nric_gender: {
        Args: { nric: string }
        Returns: string
      }
      nric_state: {
        Args: { nric: string }
        Returns: string
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: string
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid: {
        Args: { geog: unknown; srid: number } | { geom: unknown; srid: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
      validate_email: {
        Args: { email: string }
        Returns: boolean
      }
      validate_malaysian_nric: {
        Args: { nric: string }
        Returns: boolean
      }
      validate_moe_school_code: {
        Args: { code: string }
        Returns: boolean
      }
      validate_phone: {
        Args: { phone: string }
        Returns: boolean
      }
      validate_ppm_number: {
        Args: { ppm: string }
        Returns: boolean
      }
      validate_ssm_number: {
        Args: { ssm: string }
        Returns: boolean
      }
    }
    Enums: {
      affiliation_type: "permanent" | "contract" | "intern" | "agent" | "member"
      event_type:
        | "score"
        | "foul"
        | "timeout"
        | "substitution"
        | "technical"
        | "incident"
      game_status:
        | "scheduled"
        | "live"
        | "halftime"
        | "completed"
        | "cancelled"
        | "postponed"
      notification_priority: "low" | "normal" | "high" | "urgent"
      notification_type:
        | "game_reminder"
        | "score_update"
        | "emergency"
        | "achievement"
        | "system"
      org_identifier_type: "MOE" | "SSM" | "PPM" | "OTHER"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      affiliation_type: ["permanent", "contract", "intern", "agent", "member"],
      event_type: [
        "score",
        "foul",
        "timeout",
        "substitution",
        "technical",
        "incident",
      ],
      game_status: [
        "scheduled",
        "live",
        "halftime",
        "completed",
        "cancelled",
        "postponed",
      ],
      notification_priority: ["low", "normal", "high", "urgent"],
      notification_type: [
        "game_reminder",
        "score_update",
        "emergency",
        "achievement",
        "system",
      ],
      org_identifier_type: ["MOE", "SSM", "PPM", "OTHER"],
      user_role: ["admin", "user"],
    },
  },
} as const

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alert_settings: {
        Row: {
          alert_type: string
          created_at: string
          enabled: boolean
          id: string
          notification_method: string
          threshold_config: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          enabled?: boolean
          id?: string
          notification_method?: string
          threshold_config?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          enabled?: boolean
          id?: string
          notification_method?: string
          threshold_config?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          action_type: string | null
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          record_id: string | null
          table_name: string | null
          target_id: string | null
          target_type: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          action_type?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          record_id?: string | null
          table_name?: string | null
          target_id?: string | null
          target_type?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          action_type?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          record_id?: string | null
          table_name?: string | null
          target_id?: string | null
          target_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bank_transfer_requests: {
        Row: {
          amount_expected_minor: number | null
          amount_minor: number
          amount_received_minor: number | null
          approver_id: string | null
          bank_reference: string | null
          created_at: string
          currency: string
          donation_draft_id: string
          donor_id: string
          due_diligence_status: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          instructions_sent_at: string | null
          instructions_sent_by: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          received_at: string | null
          reconciliation_notes: string | null
          reconciliation_status: string | null
          reference_number: string
          resulting_donation_id: string | null
          second_approver_id: string | null
          secure_delivery_channel: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_expected_minor?: number | null
          amount_minor: number
          amount_received_minor?: number | null
          approver_id?: string | null
          bank_reference?: string | null
          created_at?: string
          currency?: string
          donation_draft_id: string
          donor_id: string
          due_diligence_status?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          instructions_sent_at?: string | null
          instructions_sent_by?: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          received_at?: string | null
          reconciliation_notes?: string | null
          reconciliation_status?: string | null
          reference_number?: string
          resulting_donation_id?: string | null
          second_approver_id?: string | null
          secure_delivery_channel?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_expected_minor?: number | null
          amount_minor?: number
          amount_received_minor?: number | null
          approver_id?: string | null
          bank_reference?: string | null
          created_at?: string
          currency?: string
          donation_draft_id?: string
          donor_id?: string
          due_diligence_status?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          instructions_sent_at?: string | null
          instructions_sent_by?: string | null
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          received_at?: string | null
          reconciliation_notes?: string | null
          reconciliation_status?: string | null
          reference_number?: string
          resulting_donation_id?: string | null
          second_approver_id?: string | null
          secure_delivery_channel?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transfer_requests_donation_draft_id_fkey"
            columns: ["donation_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transfer_requests_resulting_donation_id_fkey"
            columns: ["resulting_donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      commissioned_projects: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          budget_range: string
          country: string
          created_at: string
          currency: string
          dedication: string | null
          description: string
          donor_id: string
          end_date: string | null
          funding_target: number | null
          id: string
          project_type: string
          region: string
          start_date: string | null
          status: string
          title: string
          updated_at: string
          urgency: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          budget_range: string
          country: string
          created_at?: string
          currency?: string
          dedication?: string | null
          description: string
          donor_id: string
          end_date?: string | null
          funding_target?: number | null
          id?: string
          project_type: string
          region: string
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
          urgency: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          budget_range?: string
          country?: string
          created_at?: string
          currency?: string
          dedication?: string | null
          description?: string
          donor_id?: string
          end_date?: string | null
          funding_target?: number | null
          id?: string
          project_type?: string
          region?: string
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: []
      }
      communication_campaigns: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          audience_source: string
          channel_code: string
          created_at: string
          id: string
          lawful_basis: string
          message_version: string
          name: string
          notes: string | null
          send_completed_at: string | null
          send_started_at: string | null
          total_bounces: number | null
          total_recipients: number | null
          total_unsubscribes: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          audience_source: string
          channel_code: string
          created_at?: string
          id?: string
          lawful_basis: string
          message_version: string
          name: string
          notes?: string | null
          send_completed_at?: string | null
          send_started_at?: string | null
          total_bounces?: number | null
          total_recipients?: number | null
          total_unsubscribes?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          audience_source?: string
          channel_code?: string
          created_at?: string
          id?: string
          lawful_basis?: string
          message_version?: string
          name?: string
          notes?: string | null
          send_completed_at?: string | null
          send_started_at?: string | null
          total_bounces?: number | null
          total_recipients?: number | null
          total_unsubscribes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_campaigns_channel_code_fkey"
            columns: ["channel_code"]
            isOneToOne: false
            referencedRelation: "communication_channels"
            referencedColumns: ["code"]
          },
        ]
      }
      communication_channels: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          id: string
          is_optional_marketing: boolean
          is_project_update: boolean
          is_service_message: boolean
          label: string
          medium: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_optional_marketing?: boolean
          is_project_update?: boolean
          is_service_message?: boolean
          label: string
          medium: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_optional_marketing?: boolean
          is_project_update?: boolean
          is_service_message?: boolean
          label?: string
          medium?: string
          updated_at?: string
        }
        Relationships: []
      }
      communication_preferences: {
        Row: {
          channel_code: string
          created_at: string
          evidence_notes: string | null
          id: string
          lawful_basis: string | null
          opted_in: boolean
          set_at: string
          set_by: string
          set_by_user: string | null
          source: string | null
          updated_at: string
          user_id: string
          wording_version: string | null
        }
        Insert: {
          channel_code: string
          created_at?: string
          evidence_notes?: string | null
          id?: string
          lawful_basis?: string | null
          opted_in?: boolean
          set_at?: string
          set_by?: string
          set_by_user?: string | null
          source?: string | null
          updated_at?: string
          user_id: string
          wording_version?: string | null
        }
        Update: {
          channel_code?: string
          created_at?: string
          evidence_notes?: string | null
          id?: string
          lawful_basis?: string | null
          opted_in?: boolean
          set_at?: string
          set_by?: string
          set_by_user?: string | null
          source?: string | null
          updated_at?: string
          user_id?: string
          wording_version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_preferences_channel_code_fkey"
            columns: ["channel_code"]
            isOneToOne: false
            referencedRelation: "communication_channels"
            referencedColumns: ["code"]
          },
        ]
      }
      communication_suppressions: {
        Row: {
          channel_code: string | null
          contact_hash: string
          contact_type: string
          id: string
          reason: string
          source: string | null
          suppressed_at: string
        }
        Insert: {
          channel_code?: string | null
          contact_hash: string
          contact_type: string
          id?: string
          reason: string
          source?: string | null
          suppressed_at?: string
        }
        Update: {
          channel_code?: string | null
          contact_hash?: string
          contact_type?: string
          id?: string
          reason?: string
          source?: string | null
          suppressed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_suppressions_channel_code_fkey"
            columns: ["channel_code"]
            isOneToOne: false
            referencedRelation: "communication_channels"
            referencedColumns: ["code"]
          },
        ]
      }
      cookie_consent_events: {
        Row: {
          action: string
          analytics: boolean
          created_at: string
          functional: boolean
          id: string
          necessary: boolean
          other: boolean
          preference_version: string
          session_key: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          analytics?: boolean
          created_at?: string
          functional?: boolean
          id?: string
          necessary?: boolean
          other?: boolean
          preference_version?: string
          session_key?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          analytics?: boolean
          created_at?: string
          functional?: boolean
          id?: string
          necessary?: boolean
          other?: boolean
          preference_version?: string
          session_key?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cookie_registry: {
        Row: {
          active: boolean
          category: string
          created_at: string
          duration: string
          id: string
          is_first_party: boolean
          last_reviewed_at: string
          legal_basis: string
          notes: string | null
          provider: string
          purpose: string
          storage_key: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          category: string
          created_at?: string
          duration: string
          id?: string
          is_first_party?: boolean
          last_reviewed_at?: string
          legal_basis: string
          notes?: string | null
          provider: string
          purpose: string
          storage_key: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          duration?: string
          id?: string
          is_first_party?: boolean
          last_reviewed_at?: string
          legal_basis?: string
          notes?: string | null
          provider?: string
          purpose?: string
          storage_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      data_retention_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      document_records: {
        Row: {
          created_at: string
          document_id: string
          document_type: string
          downloaded_count: number | null
          expires_at: string | null
          file_path: string
          file_size: number | null
          id: string
          last_downloaded_at: string | null
          metadata: Json | null
          related_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          document_type: string
          downloaded_count?: number | null
          expires_at?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          last_downloaded_at?: string | null
          metadata?: Json | null
          related_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          document_type?: string
          downloaded_count?: number | null
          expires_at?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          last_downloaded_at?: string | null
          metadata?: Json | null
          related_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      donation_adjustments: {
        Row: {
          adjustment_type: string
          amount_minor: number
          approved_by: string | null
          created_at: string
          currency: string
          donation_id: string
          id: string
          occurred_at: string
          provider: string
          provider_reference: string | null
          reason: string | null
          recorded_by: string | null
          updated_at: string
        }
        Insert: {
          adjustment_type: string
          amount_minor: number
          approved_by?: string | null
          created_at?: string
          currency?: string
          donation_id: string
          id?: string
          occurred_at?: string
          provider: string
          provider_reference?: string | null
          reason?: string | null
          recorded_by?: string | null
          updated_at?: string
        }
        Update: {
          adjustment_type?: string
          amount_minor?: number
          approved_by?: string | null
          created_at?: string
          currency?: string
          donation_id?: string
          id?: string
          occurred_at?: string
          provider?: string
          provider_reference?: string | null
          reason?: string | null
          recorded_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_adjustments_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_allocations: {
        Row: {
          allocation_status: string
          amount_committed: number
          amount_remaining: number
          amount_spent: number
          created_at: string
          currency: string
          donation_id: string
          donor_id: string | null
          gross_donation_amount: number
          id: string
          notes: string | null
          operating_allocation_amount: number
          operating_allocation_rate: number
          project_delivery_allocation: number
          updated_at: string
        }
        Insert: {
          allocation_status?: string
          amount_committed?: number
          amount_remaining: number
          amount_spent?: number
          created_at?: string
          currency?: string
          donation_id: string
          donor_id?: string | null
          gross_donation_amount: number
          id?: string
          notes?: string | null
          operating_allocation_amount: number
          operating_allocation_rate?: number
          project_delivery_allocation: number
          updated_at?: string
        }
        Update: {
          allocation_status?: string
          amount_committed?: number
          amount_remaining?: number
          amount_spent?: number
          created_at?: string
          currency?: string
          donation_id?: string
          donor_id?: string | null
          gross_donation_amount?: number
          id?: string
          notes?: string | null
          operating_allocation_amount?: number
          operating_allocation_rate?: number
          project_delivery_allocation?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_allocations_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: true
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_drafts: {
        Row: {
          amount_minor: number
          anonymous: boolean
          confirmation_version: string | null
          confirmed_at: string | null
          created_at: string
          currency: string
          delivery_allocation_minor: number
          donor_id: string
          expires_at: string
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          notes: string | null
          operating_allocation_minor: number
          payment_route: string | null
          proposed_project_id: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          recognition_preference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_minor: number
          anonymous?: boolean
          confirmation_version?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          delivery_allocation_minor: number
          donor_id: string
          expires_at?: string
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          operating_allocation_minor: number
          payment_route?: string | null
          proposed_project_id?: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          recognition_preference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_minor?: number
          anonymous?: boolean
          confirmation_version?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          delivery_allocation_minor?: number
          donor_id?: string
          expires_at?: string
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          operating_allocation_minor?: number
          payment_route?: string | null
          proposed_project_id?: string | null
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          recognition_preference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_drafts_proposed_project_id_fkey"
            columns: ["proposed_project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_funding_terms_acceptances: {
        Row: {
          acceptance_text_snapshot: string
          accepted_at: string
          amount_minor: number
          created_at: string
          currency: string
          delivery_allocation_minor: number
          document_id: string
          donation_draft_id: string
          frequency: string
          id: string
          operating_allocation_minor: number
          proposed_project_id: string | null
          purpose: string | null
          user_id: string
          version_id: string
        }
        Insert: {
          acceptance_text_snapshot: string
          accepted_at?: string
          amount_minor: number
          created_at?: string
          currency: string
          delivery_allocation_minor: number
          document_id: string
          donation_draft_id: string
          frequency: string
          id?: string
          operating_allocation_minor: number
          proposed_project_id?: string | null
          purpose?: string | null
          user_id: string
          version_id: string
        }
        Update: {
          acceptance_text_snapshot?: string
          accepted_at?: string
          amount_minor?: number
          created_at?: string
          currency?: string
          delivery_allocation_minor?: number
          document_id?: string
          donation_draft_id?: string
          frequency?: string
          id?: string
          operating_allocation_minor?: number
          proposed_project_id?: string | null
          purpose?: string | null
          user_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_funding_terms_acceptances_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_funding_terms_acceptances_donation_draft_id_fkey"
            columns: ["donation_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_funding_terms_acceptances_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "legal_document_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_transaction_confirmations: {
        Row: {
          confirmed_at: string
          currency: string
          delivery_allocation_minor: number
          donation_draft_id: string
          donor_id: string
          frequency: Database["public"]["Enums"]["donation_frequency"]
          gross_amount_minor: number
          id: string
          operating_allocation_minor: number
          purpose: Database["public"]["Enums"]["donation_purpose"]
          wording_version: string
        }
        Insert: {
          confirmed_at?: string
          currency: string
          delivery_allocation_minor: number
          donation_draft_id: string
          donor_id: string
          frequency: Database["public"]["Enums"]["donation_frequency"]
          gross_amount_minor: number
          id?: string
          operating_allocation_minor: number
          purpose: Database["public"]["Enums"]["donation_purpose"]
          wording_version: string
        }
        Update: {
          confirmed_at?: string
          currency?: string
          delivery_allocation_minor?: number
          donation_draft_id?: string
          donor_id?: string
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          gross_amount_minor?: number
          id?: string
          operating_allocation_minor?: number
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          wording_version?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_transaction_confirmations_donation_draft_id_fkey"
            columns: ["donation_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          amount_minor: number | null
          created_at: string
          currency: string
          donation_draft_id: string | null
          donor_id: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          notes: string | null
          payment_provider: string | null
          payment_route: string | null
          processed_at: string | null
          provider_payment_intent_id: string | null
          provider_subscription_id: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference: string | null
          receipt_url: string | null
          status: string
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          amount: number
          amount_minor?: number | null
          created_at?: string
          currency?: string
          donation_draft_id?: string | null
          donor_id?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          payment_provider?: string | null
          payment_route?: string | null
          processed_at?: string | null
          provider_payment_intent_id?: string | null
          provider_subscription_id?: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference?: string | null
          receipt_url?: string | null
          status?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          amount?: number
          amount_minor?: number | null
          created_at?: string
          currency?: string
          donation_draft_id?: string | null
          donor_id?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          payment_provider?: string | null
          payment_route?: string | null
          processed_at?: string | null
          provider_payment_intent_id?: string | null
          provider_subscription_id?: string | null
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference?: string | null
          receipt_url?: string | null
          status?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donation_draft_id_fkey"
            columns: ["donation_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
        ]
      }
      email_unsubscribe_public_tokens: {
        Row: {
          channel_code: string | null
          contact_hash: string
          contact_type: string
          created_at: string
          expires_at: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          channel_code?: string | null
          contact_hash: string
          contact_type: string
          created_at?: string
          expires_at?: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          channel_code?: string | null
          contact_hash?: string
          contact_type?: string
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_unsubscribe_public_tokens_channel_code_fkey"
            columns: ["channel_code"]
            isOneToOne: false
            referencedRelation: "communication_channels"
            referencedColumns: ["code"]
          },
        ]
      }
      fund_allocations: {
        Row: {
          allocated_by: string | null
          amount: number
          created_at: string
          donation_id: string
          id: string
          notes: string | null
          project_id: string | null
          project_name: string
        }
        Insert: {
          allocated_by?: string | null
          amount: number
          created_at?: string
          donation_id: string
          id?: string
          notes?: string | null
          project_id?: string | null
          project_name: string
        }
        Update: {
          allocated_by?: string | null
          amount?: number
          created_at?: string
          donation_id?: string
          id?: string
          notes?: string | null
          project_id?: string | null
          project_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fund_allocations_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fund_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      gdpr_request_events: {
        Row: {
          actor_role: string | null
          actor_user_id: string | null
          created_at: string
          detail: Json | null
          event_type: string
          id: string
          request_id: string
        }
        Insert: {
          actor_role?: string | null
          actor_user_id?: string | null
          created_at?: string
          detail?: Json | null
          event_type: string
          id?: string
          request_id: string
        }
        Update: {
          actor_role?: string | null
          actor_user_id?: string | null
          created_at?: string
          detail?: Json | null
          event_type?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gdpr_request_events_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "gdpr_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gdpr_request_events_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "my_gdpr_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      gdpr_requests: {
        Row: {
          assigned_to: string | null
          authority_verified_at: string | null
          channel: string | null
          clarification_received_at: string | null
          clarification_requested_at: string | null
          clock_paused_at: string | null
          clock_resumed_at: string | null
          clock_start_at: string | null
          completed_at: string | null
          created_at: string
          decision: string | null
          due_at: string | null
          email: string | null
          exemption_reasons: string[] | null
          exemption_review: string | null
          extended_due_at: string | null
          extension_applied: boolean
          extension_notification_channel: string | null
          extension_notification_note: string | null
          extension_notified_at: string | null
          extension_reason: string | null
          id: string
          identity_requested_at: string | null
          identity_status: string | null
          identity_verified_at: string | null
          internal_notes: string | null
          is_test: boolean
          pause_reason: string | null
          processed_at: string | null
          processed_by: string | null
          received_at: string | null
          reference_number: string | null
          representative_authority_status: string | null
          representative_name: string | null
          request_details: string | null
          request_type: string
          requester_contact: string | null
          requester_name: string | null
          response_package_reference: string | null
          response_summary: string | null
          scope: string | null
          secure_delivery_method: string | null
          status: string
          systems_to_search: string[] | null
          third_party_information_review: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          authority_verified_at?: string | null
          channel?: string | null
          clarification_received_at?: string | null
          clarification_requested_at?: string | null
          clock_paused_at?: string | null
          clock_resumed_at?: string | null
          clock_start_at?: string | null
          completed_at?: string | null
          created_at?: string
          decision?: string | null
          due_at?: string | null
          email?: string | null
          exemption_reasons?: string[] | null
          exemption_review?: string | null
          extended_due_at?: string | null
          extension_applied?: boolean
          extension_notification_channel?: string | null
          extension_notification_note?: string | null
          extension_notified_at?: string | null
          extension_reason?: string | null
          id?: string
          identity_requested_at?: string | null
          identity_status?: string | null
          identity_verified_at?: string | null
          internal_notes?: string | null
          is_test?: boolean
          pause_reason?: string | null
          processed_at?: string | null
          processed_by?: string | null
          received_at?: string | null
          reference_number?: string | null
          representative_authority_status?: string | null
          representative_name?: string | null
          request_details?: string | null
          request_type: string
          requester_contact?: string | null
          requester_name?: string | null
          response_package_reference?: string | null
          response_summary?: string | null
          scope?: string | null
          secure_delivery_method?: string | null
          status?: string
          systems_to_search?: string[] | null
          third_party_information_review?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          authority_verified_at?: string | null
          channel?: string | null
          clarification_received_at?: string | null
          clarification_requested_at?: string | null
          clock_paused_at?: string | null
          clock_resumed_at?: string | null
          clock_start_at?: string | null
          completed_at?: string | null
          created_at?: string
          decision?: string | null
          due_at?: string | null
          email?: string | null
          exemption_reasons?: string[] | null
          exemption_review?: string | null
          extended_due_at?: string | null
          extension_applied?: boolean
          extension_notification_channel?: string | null
          extension_notification_note?: string | null
          extension_notified_at?: string | null
          extension_reason?: string | null
          id?: string
          identity_requested_at?: string | null
          identity_status?: string | null
          identity_verified_at?: string | null
          internal_notes?: string | null
          is_test?: boolean
          pause_reason?: string | null
          processed_at?: string | null
          processed_by?: string | null
          received_at?: string | null
          reference_number?: string | null
          representative_authority_status?: string | null
          representative_name?: string | null
          request_details?: string | null
          request_type?: string
          requester_contact?: string | null
          requester_name?: string | null
          response_package_reference?: string | null
          response_summary?: string | null
          scope?: string | null
          secure_delivery_method?: string | null
          status?: string
          systems_to_search?: string[] | null
          third_party_information_review?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      high_value_donation_agreements: {
        Row: {
          closed_at: string | null
          created_at: string
          current_version_id: string | null
          designation_notes: string | null
          designation_reasons: Database["public"]["Enums"]["hvda_designation_reason"][]
          donor_display_name: string | null
          donor_user_id: string | null
          id: string
          opened_by: string | null
          reference: string | null
          related_donation_draft_id: string | null
          related_project_id: string | null
          status: Database["public"]["Enums"]["hvda_status"]
          updated_at: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          current_version_id?: string | null
          designation_notes?: string | null
          designation_reasons?: Database["public"]["Enums"]["hvda_designation_reason"][]
          donor_display_name?: string | null
          donor_user_id?: string | null
          id?: string
          opened_by?: string | null
          reference?: string | null
          related_donation_draft_id?: string | null
          related_project_id?: string | null
          status?: Database["public"]["Enums"]["hvda_status"]
          updated_at?: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          current_version_id?: string | null
          designation_notes?: string | null
          designation_reasons?: Database["public"]["Enums"]["hvda_designation_reason"][]
          donor_display_name?: string | null
          donor_user_id?: string | null
          id?: string
          opened_by?: string | null
          reference?: string | null
          related_donation_draft_id?: string | null
          related_project_id?: string | null
          status?: Database["public"]["Enums"]["hvda_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "high_value_donation_agreements_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_current_version_fk"
            columns: ["current_version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_amendments: {
        Row: {
          agreement_id: string
          created_at: string
          created_by: string
          id: string
          new_version_id: string
          previous_version_id: string
          reason: string
          summary_of_changes: string
        }
        Insert: {
          agreement_id: string
          created_at?: string
          created_by: string
          id?: string
          new_version_id: string
          previous_version_id: string
          reason: string
          summary_of_changes: string
        }
        Update: {
          agreement_id?: string
          created_at?: string
          created_by?: string
          id?: string
          new_version_id?: string
          previous_version_id?: string
          reason?: string
          summary_of_changes?: string
        }
        Relationships: [
          {
            foreignKeyName: "hvda_amendments_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_amendments_new_version_id_fkey"
            columns: ["new_version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_amendments_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_approvals: {
        Row: {
          agreement_id: string
          approval_type: Database["public"]["Enums"]["hvda_approval_type"]
          comment: string | null
          created_at: string
          decided_at: string
          decided_by: string
          decision: Database["public"]["Enums"]["hvda_approval_decision"]
          id: string
          supporting_reference: string | null
          version_id: string
        }
        Insert: {
          agreement_id: string
          approval_type: Database["public"]["Enums"]["hvda_approval_type"]
          comment?: string | null
          created_at?: string
          decided_at?: string
          decided_by: string
          decision: Database["public"]["Enums"]["hvda_approval_decision"]
          id?: string
          supporting_reference?: string | null
          version_id: string
        }
        Update: {
          agreement_id?: string
          approval_type?: Database["public"]["Enums"]["hvda_approval_type"]
          comment?: string | null
          created_at?: string
          decided_at?: string
          decided_by?: string
          decision?: Database["public"]["Enums"]["hvda_approval_decision"]
          id?: string
          supporting_reference?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hvda_approvals_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_approvals_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_conditions: {
        Row: {
          agreement_id: string
          created_at: string
          description: string
          evidence_reference: string | null
          id: string
          notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          sequence: number
          status: Database["public"]["Enums"]["hvda_condition_status"]
          updated_at: string
          version_id: string
        }
        Insert: {
          agreement_id: string
          created_at?: string
          description: string
          evidence_reference?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sequence: number
          status?: Database["public"]["Enums"]["hvda_condition_status"]
          updated_at?: string
          version_id: string
        }
        Update: {
          agreement_id?: string
          created_at?: string
          description?: string
          evidence_reference?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sequence?: number
          status?: Database["public"]["Enums"]["hvda_condition_status"]
          updated_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hvda_conditions_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_conditions_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_payment_schedule: {
        Row: {
          agreement_id: string
          amount_minor: number
          created_at: string
          currency: string
          due_date: string | null
          id: string
          notes: string | null
          payment_route: string | null
          received_at: string | null
          sequence: number
          status: string
          updated_at: string
          version_id: string
        }
        Insert: {
          agreement_id: string
          amount_minor: number
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_route?: string | null
          received_at?: string | null
          sequence: number
          status?: string
          updated_at?: string
          version_id: string
        }
        Update: {
          agreement_id?: string
          amount_minor?: number
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_route?: string | null
          received_at?: string | null
          sequence?: number
          status?: string
          updated_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hvda_payment_schedule_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_payment_schedule_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_signatures: {
        Row: {
          agreement_id: string
          created_at: string
          evidence_reference: string | null
          id: string
          method: string
          recorded_by: string
          signatory_name: string
          signatory_role: Database["public"]["Enums"]["hvda_signatory_role"]
          signatory_title: string | null
          signatory_user_id: string | null
          signed_at: string
          version_id: string
        }
        Insert: {
          agreement_id: string
          created_at?: string
          evidence_reference?: string | null
          id?: string
          method?: string
          recorded_by: string
          signatory_name: string
          signatory_role: Database["public"]["Enums"]["hvda_signatory_role"]
          signatory_title?: string | null
          signatory_user_id?: string | null
          signed_at?: string
          version_id: string
        }
        Update: {
          agreement_id?: string
          created_at?: string
          evidence_reference?: string | null
          id?: string
          method?: string
          recorded_by?: string
          signatory_name?: string
          signatory_role?: Database["public"]["Enums"]["hvda_signatory_role"]
          signatory_title?: string | null
          signatory_user_id?: string | null
          signed_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hvda_signatures_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hvda_signatures_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "hvda_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      hvda_versions: {
        Row: {
          agreement_id: string
          amendments_clause: string | null
          anti_fraud_representation: string | null
          approved_evidence_clause: string | null
          authored_at: string
          authored_by: string | null
          background: string | null
          beneficial_ownership_details: string | null
          beneficiary_privacy_clause: string | null
          charitable_purpose: string | null
          conditions_precedent_narrative: string | null
          confidentiality_clause: string | null
          created_at: string
          currency: string | null
          data_protection_clause: string | null
          delivery_allocation_pct: number
          donation_amount_minor: number | null
          donor_authority_details: string | null
          donor_identity_details: string | null
          donor_party_name: string | null
          entire_agreement_clause: string | null
          force_majeure_clause: string | null
          governing_law_clause: string | null
          id: string
          intended_project_or_purpose: string | null
          is_locked: boolean
          is_restricted: boolean | null
          legal_review_completed_at: string | null
          legal_review_firm: string | null
          legal_review_notes: string | null
          legal_review_reference: string | null
          locked_at: string | null
          no_donor_ownership_or_control_clause: string | null
          no_partnership_agency_clause: string | null
          no_unlawful_or_third_party_funds: string | null
          notices_clause: string | null
          operating_allocation_pct: number
          payment_route: string | null
          payment_schedule_narrative: string | null
          project_budget: string | null
          project_changes_clause: string | null
          publicity_and_recognition_clause: string | null
          reallocation_clause: string | null
          refund_limitations_clause: string | null
          refusal_clause: string | null
          reporting_clause: string | null
          restriction_details: string | null
          return_of_funds_clause: string | null
          sanctions_representation: string | null
          signature_block_notes: string | null
          source_of_funds_representation: string | null
          source_of_wealth_information: string | null
          suspension_clause: string | null
          tax_and_gift_aid_clause: string | null
          termination_clause: string | null
          trust_party_name: string | null
          trustee_discretion_clause: string | null
          updated_at: string
          version_number: number
          warranties_clause: string | null
        }
        Insert: {
          agreement_id: string
          amendments_clause?: string | null
          anti_fraud_representation?: string | null
          approved_evidence_clause?: string | null
          authored_at?: string
          authored_by?: string | null
          background?: string | null
          beneficial_ownership_details?: string | null
          beneficiary_privacy_clause?: string | null
          charitable_purpose?: string | null
          conditions_precedent_narrative?: string | null
          confidentiality_clause?: string | null
          created_at?: string
          currency?: string | null
          data_protection_clause?: string | null
          delivery_allocation_pct?: number
          donation_amount_minor?: number | null
          donor_authority_details?: string | null
          donor_identity_details?: string | null
          donor_party_name?: string | null
          entire_agreement_clause?: string | null
          force_majeure_clause?: string | null
          governing_law_clause?: string | null
          id?: string
          intended_project_or_purpose?: string | null
          is_locked?: boolean
          is_restricted?: boolean | null
          legal_review_completed_at?: string | null
          legal_review_firm?: string | null
          legal_review_notes?: string | null
          legal_review_reference?: string | null
          locked_at?: string | null
          no_donor_ownership_or_control_clause?: string | null
          no_partnership_agency_clause?: string | null
          no_unlawful_or_third_party_funds?: string | null
          notices_clause?: string | null
          operating_allocation_pct?: number
          payment_route?: string | null
          payment_schedule_narrative?: string | null
          project_budget?: string | null
          project_changes_clause?: string | null
          publicity_and_recognition_clause?: string | null
          reallocation_clause?: string | null
          refund_limitations_clause?: string | null
          refusal_clause?: string | null
          reporting_clause?: string | null
          restriction_details?: string | null
          return_of_funds_clause?: string | null
          sanctions_representation?: string | null
          signature_block_notes?: string | null
          source_of_funds_representation?: string | null
          source_of_wealth_information?: string | null
          suspension_clause?: string | null
          tax_and_gift_aid_clause?: string | null
          termination_clause?: string | null
          trust_party_name?: string | null
          trustee_discretion_clause?: string | null
          updated_at?: string
          version_number: number
          warranties_clause?: string | null
        }
        Update: {
          agreement_id?: string
          amendments_clause?: string | null
          anti_fraud_representation?: string | null
          approved_evidence_clause?: string | null
          authored_at?: string
          authored_by?: string | null
          background?: string | null
          beneficial_ownership_details?: string | null
          beneficiary_privacy_clause?: string | null
          charitable_purpose?: string | null
          conditions_precedent_narrative?: string | null
          confidentiality_clause?: string | null
          created_at?: string
          currency?: string | null
          data_protection_clause?: string | null
          delivery_allocation_pct?: number
          donation_amount_minor?: number | null
          donor_authority_details?: string | null
          donor_identity_details?: string | null
          donor_party_name?: string | null
          entire_agreement_clause?: string | null
          force_majeure_clause?: string | null
          governing_law_clause?: string | null
          id?: string
          intended_project_or_purpose?: string | null
          is_locked?: boolean
          is_restricted?: boolean | null
          legal_review_completed_at?: string | null
          legal_review_firm?: string | null
          legal_review_notes?: string | null
          legal_review_reference?: string | null
          locked_at?: string | null
          no_donor_ownership_or_control_clause?: string | null
          no_partnership_agency_clause?: string | null
          no_unlawful_or_third_party_funds?: string | null
          notices_clause?: string | null
          operating_allocation_pct?: number
          payment_route?: string | null
          payment_schedule_narrative?: string | null
          project_budget?: string | null
          project_changes_clause?: string | null
          publicity_and_recognition_clause?: string | null
          reallocation_clause?: string | null
          refund_limitations_clause?: string | null
          refusal_clause?: string | null
          reporting_clause?: string | null
          restriction_details?: string | null
          return_of_funds_clause?: string | null
          sanctions_representation?: string | null
          signature_block_notes?: string | null
          source_of_funds_representation?: string | null
          source_of_wealth_information?: string | null
          suspension_clause?: string | null
          tax_and_gift_aid_clause?: string | null
          termination_clause?: string | null
          trust_party_name?: string | null
          trustee_discretion_clause?: string | null
          updated_at?: string
          version_number?: number
          warranties_clause?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hvda_versions_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "high_value_donation_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      inbound_contacts: {
        Row: {
          additional_context: string | null
          admin_notes: string | null
          attachment_url: string | null
          created_at: string
          email: string
          gdpr_consent: boolean
          id: string
          internal_tags: string[] | null
          message: string
          name: string
          nature_of_enquiry: string
          organisation: string | null
          phone: string | null
          position: string | null
          priority: string
          status: string
        }
        Insert: {
          additional_context?: string | null
          admin_notes?: string | null
          attachment_url?: string | null
          created_at?: string
          email: string
          gdpr_consent?: boolean
          id?: string
          internal_tags?: string[] | null
          message: string
          name: string
          nature_of_enquiry: string
          organisation?: string | null
          phone?: string | null
          position?: string | null
          priority?: string
          status?: string
        }
        Update: {
          additional_context?: string | null
          admin_notes?: string | null
          attachment_url?: string | null
          created_at?: string
          email?: string
          gdpr_consent?: boolean
          id?: string
          internal_tags?: string[] | null
          message?: string
          name?: string
          nature_of_enquiry?: string
          organisation?: string | null
          phone?: string | null
          position?: string | null
          priority?: string
          status?: string
        }
        Relationships: []
      }
      legal_acceptances: {
        Row: {
          acceptance_context: string | null
          acceptance_text_snapshot: string
          accepted_at: string
          document_id: string
          event_type: string
          id: string
          ip_hash: string | null
          project_id: string | null
          role: string | null
          user_agent: string | null
          user_id: string
          version_id: string
        }
        Insert: {
          acceptance_context?: string | null
          acceptance_text_snapshot: string
          accepted_at?: string
          document_id: string
          event_type?: string
          id?: string
          ip_hash?: string | null
          project_id?: string | null
          role?: string | null
          user_agent?: string | null
          user_id: string
          version_id: string
        }
        Update: {
          acceptance_context?: string | null
          acceptance_text_snapshot?: string
          accepted_at?: string
          document_id?: string
          event_type?: string
          id?: string
          ip_hash?: string | null
          project_id?: string | null
          role?: string | null
          user_agent?: string | null
          user_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_acceptances_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_acceptances_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_acceptances_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "legal_document_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_document_versions: {
        Row: {
          acceptance_text: string | null
          approved_at: string | null
          approved_by: string | null
          body_markdown: string
          created_at: string
          created_by: string | null
          document_id: string
          effective_date: string | null
          id: string
          material_change: boolean
          published_at: string | null
          review_status: Database["public"]["Enums"]["legal_review_status"]
          reviewer_id: string | null
          reviewer_note: string | null
          summary: string | null
          superseded_at: string | null
          supersedes_version_id: string | null
          title: string
          updated_at: string
          version_number: number
        }
        Insert: {
          acceptance_text?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body_markdown?: string
          created_at?: string
          created_by?: string | null
          document_id: string
          effective_date?: string | null
          id?: string
          material_change?: boolean
          published_at?: string | null
          review_status?: Database["public"]["Enums"]["legal_review_status"]
          reviewer_id?: string | null
          reviewer_note?: string | null
          summary?: string | null
          superseded_at?: string | null
          supersedes_version_id?: string | null
          title: string
          updated_at?: string
          version_number: number
        }
        Update: {
          acceptance_text?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body_markdown?: string
          created_at?: string
          created_by?: string | null
          document_id?: string
          effective_date?: string | null
          id?: string
          material_change?: boolean
          published_at?: string | null
          review_status?: Database["public"]["Enums"]["legal_review_status"]
          reviewer_id?: string | null
          reviewer_note?: string | null
          summary?: string | null
          superseded_at?: string | null
          supersedes_version_id?: string | null
          title?: string
          updated_at?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "legal_document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "legal_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_document_versions_supersedes_version_id_fkey"
            columns: ["supersedes_version_id"]
            isOneToOne: false
            referencedRelation: "legal_document_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_documents: {
        Row: {
          category: string
          created_at: string
          current_published_version_id: string | null
          description: string | null
          id: string
          requires_donation_acceptance: boolean
          requires_signup_acceptance: boolean
          requires_team_acceptance: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          current_published_version_id?: string | null
          description?: string | null
          id?: string
          requires_donation_acceptance?: boolean
          requires_signup_acceptance?: boolean
          requires_team_acceptance?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          current_published_version_id?: string | null
          description?: string | null
          id?: string
          requires_donation_acceptance?: boolean
          requires_signup_acceptance?: boolean
          requires_team_acceptance?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_entity_settings: {
        Row: {
          charity_number: string | null
          company_number: string | null
          contact_email: string | null
          created_at: string
          enhanced_dd_threshold: number
          governing_law: string | null
          high_value_threshold: number
          id: string
          insurance_summary: string | null
          jurisdiction: string | null
          legal_name: string | null
          legal_status: string | null
          registered_address: string | null
          regulator: string | null
          singleton: boolean
          trading_name: string | null
          trustee_approval_threshold: number
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          charity_number?: string | null
          company_number?: string | null
          contact_email?: string | null
          created_at?: string
          enhanced_dd_threshold?: number
          governing_law?: string | null
          high_value_threshold?: number
          id?: string
          insurance_summary?: string | null
          jurisdiction?: string | null
          legal_name?: string | null
          legal_status?: string | null
          registered_address?: string | null
          regulator?: string | null
          singleton?: boolean
          trading_name?: string | null
          trustee_approval_threshold?: number
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          charity_number?: string | null
          company_number?: string | null
          contact_email?: string | null
          created_at?: string
          enhanced_dd_threshold?: number
          governing_law?: string | null
          high_value_threshold?: number
          id?: string
          insurance_summary?: string | null
          jurisdiction?: string | null
          legal_name?: string | null
          legal_status?: string | null
          registered_address?: string | null
          regulator?: string | null
          singleton?: boolean
          trading_name?: string | null
          trustee_approval_threshold?: number
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          created_at: string
          from_user_id: string | null
          id: string
          is_template: boolean | null
          read_at: string | null
          status: Database["public"]["Enums"]["message_status"]
          subject: string
          to_user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          from_user_id?: string | null
          id?: string
          is_template?: boolean | null
          read_at?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject: string
          to_user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          from_user_id?: string | null
          id?: string
          is_template?: boolean | null
          read_at?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string
          to_user_id?: string
        }
        Relationships: []
      }
      onboarding_status: {
        Row: {
          admin_onboarding_complete: boolean
          created_at: string
          donor_onboarding_complete: boolean
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
          volunteer_onboarding_complete: boolean
        }
        Insert: {
          admin_onboarding_complete?: boolean
          created_at?: string
          donor_onboarding_complete?: boolean
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
          volunteer_onboarding_complete?: boolean
        }
        Update: {
          admin_onboarding_complete?: boolean
          created_at?: string
          donor_onboarding_complete?: boolean
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
          volunteer_onboarding_complete?: boolean
        }
        Relationships: []
      }
      payment_attempts: {
        Row: {
          amount_minor: number
          created_at: string
          currency: string
          donation_draft_id: string
          donor_id: string
          failure_code: string | null
          failure_message: string | null
          id: string
          payment_mode: string
          provider: string
          provider_checkout_session_id: string | null
          provider_payment_intent_id: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_minor: number
          created_at?: string
          currency?: string
          donation_draft_id: string
          donor_id: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          payment_mode: string
          provider: string
          provider_checkout_session_id?: string | null
          provider_payment_intent_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_minor?: number
          created_at?: string
          currency?: string
          donation_draft_id?: string
          donor_id?: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          payment_mode?: string
          provider?: string
          provider_checkout_session_id?: string | null
          provider_payment_intent_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_attempts_donation_draft_id_fkey"
            columns: ["donation_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_provider_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
          processing_result: string | null
          provider: string
          provider_event_id: string
          related_donation_id: string | null
          related_draft_id: string | null
          signature_verified: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          payload: Json
          processed_at?: string | null
          processing_result?: string | null
          provider: string
          provider_event_id: string
          related_donation_id?: string | null
          related_draft_id?: string | null
          signature_verified?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          processing_result?: string | null
          provider?: string
          provider_event_id?: string
          related_donation_id?: string | null
          related_draft_id?: string | null
          signature_verified?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_provider_events_related_donation_id_fkey"
            columns: ["related_donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_provider_events_related_draft_id_fkey"
            columns: ["related_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_receipts: {
        Row: {
          anonymous: boolean
          created_at: string
          currency: string
          delivery_allocation_minor: number
          donation_id: string
          donor_display_name: string | null
          donor_id: string
          gross_amount_minor: number
          id: string
          operating_allocation_minor: number
          paid_at: string
          payment_route: string
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference: string
          refund_adjustments: Json
        }
        Insert: {
          anonymous?: boolean
          created_at?: string
          currency: string
          delivery_allocation_minor: number
          donation_id: string
          donor_display_name?: string | null
          donor_id: string
          gross_amount_minor: number
          id?: string
          operating_allocation_minor: number
          paid_at: string
          payment_route: string
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference?: string
          refund_adjustments?: Json
        }
        Update: {
          anonymous?: boolean
          created_at?: string
          currency?: string
          delivery_allocation_minor?: number
          donation_id?: string
          donor_display_name?: string | null
          donor_id?: string
          gross_amount_minor?: number
          id?: string
          operating_allocation_minor?: number
          paid_at?: string
          payment_route?: string
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          receipt_reference?: string
          refund_adjustments?: Json
        }
        Relationships: [
          {
            foreignKeyName: "payment_receipts_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_settings: {
        Row: {
          account_number: string | null
          bank_name: string | null
          beneficiary_name: string | null
          bic: string | null
          created_at: string
          gocardless_enabled: boolean
          gocardless_environment: string | null
          iban: string | null
          id: string
          instructions_notes: string | null
          show_details_to_donor_after_confirmation: boolean
          singleton: boolean
          sort_code: string | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          beneficiary_name?: string | null
          bic?: string | null
          created_at?: string
          gocardless_enabled?: boolean
          gocardless_environment?: string | null
          iban?: string | null
          id?: string
          instructions_notes?: string | null
          show_details_to_donor_after_confirmation?: boolean
          singleton?: boolean
          sort_code?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          beneficiary_name?: string | null
          bic?: string | null
          created_at?: string
          gocardless_enabled?: boolean
          gocardless_environment?: string | null
          iban?: string | null
          id?: string
          instructions_notes?: string | null
          show_details_to_donor_after_confirmation?: boolean
          singleton?: boolean
          sort_code?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      payment_webhook_events: {
        Row: {
          event_type: string
          id: string
          payload_hash: string | null
          processed_at: string | null
          processing_error: string | null
          provider: string
          provider_event_id: string
          received_at: string
        }
        Insert: {
          event_type: string
          id?: string
          payload_hash?: string | null
          processed_at?: string | null
          processing_error?: string | null
          provider?: string
          provider_event_id: string
          received_at?: string
        }
        Update: {
          event_type?: string
          id?: string
          payload_hash?: string | null
          processed_at?: string | null
          processing_error?: string | null
          provider?: string
          provider_event_id?: string
          received_at?: string
        }
        Relationships: []
      }
      presentation_exports: {
        Row: {
          created_at: string
          created_by: string | null
          downloaded_count: number | null
          expires_at: string | null
          export_type: string
          file_path: string | null
          id: string
          presentation_id: string
          share_link: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          downloaded_count?: number | null
          expires_at?: string | null
          export_type: string
          file_path?: string | null
          id?: string
          presentation_id: string
          share_link?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          downloaded_count?: number | null
          expires_at?: string | null
          export_type?: string
          file_path?: string | null
          id?: string
          presentation_id?: string
          share_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presentation_exports_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      presentation_slides: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_urls: string[] | null
          layout_config: Json | null
          presentation_id: string
          slide_order: number
          slide_type: string
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          layout_config?: Json | null
          presentation_id: string
          slide_order: number
          slide_type: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          layout_config?: Json | null
          presentation_id?: string
          slide_order?: number
          slide_type?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "presentation_slides_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      presentations: {
        Row: {
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          id: string
          metadata: Json | null
          project_id: string | null
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "presentations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_international_transfers: {
        Row: {
          assessed_by: string | null
          contract_status: string | null
          created_at: string
          created_by: string | null
          data_subject_categories: string[] | null
          destination_country: string | null
          effective_date: string | null
          encryption_or_access_controls: string | null
          frequency: string | null
          id: string
          mechanism_reference: string | null
          notes: string | null
          onward_transfer_countries: string[] | null
          owner_user_id: string | null
          personal_data_categories: string[] | null
          purpose: string | null
          recipient_name: string
          recipient_role: string
          review_date: string | null
          risk_assessment_date: string | null
          risk_assessment_reference: string | null
          special_category_data: boolean
          status: string
          supplementary_safeguards: string | null
          transfer_mechanism: string
          transfer_method: string | null
          transfer_reference: string
          transfer_risk_assessment_status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          assessed_by?: string | null
          contract_status?: string | null
          created_at?: string
          created_by?: string | null
          data_subject_categories?: string[] | null
          destination_country?: string | null
          effective_date?: string | null
          encryption_or_access_controls?: string | null
          frequency?: string | null
          id?: string
          mechanism_reference?: string | null
          notes?: string | null
          onward_transfer_countries?: string[] | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          purpose?: string | null
          recipient_name: string
          recipient_role: string
          review_date?: string | null
          risk_assessment_date?: string | null
          risk_assessment_reference?: string | null
          special_category_data?: boolean
          status?: string
          supplementary_safeguards?: string | null
          transfer_mechanism?: string
          transfer_method?: string | null
          transfer_reference: string
          transfer_risk_assessment_status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          assessed_by?: string | null
          contract_status?: string | null
          created_at?: string
          created_by?: string | null
          data_subject_categories?: string[] | null
          destination_country?: string | null
          effective_date?: string | null
          encryption_or_access_controls?: string | null
          frequency?: string | null
          id?: string
          mechanism_reference?: string | null
          notes?: string | null
          onward_transfer_countries?: string[] | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          purpose?: string | null
          recipient_name?: string
          recipient_role?: string
          review_date?: string | null
          risk_assessment_date?: string | null
          risk_assessment_reference?: string | null
          special_category_data?: boolean
          status?: string
          supplementary_safeguards?: string | null
          transfer_mechanism?: string
          transfer_method?: string | null
          transfer_reference?: string
          transfer_risk_assessment_status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      privacy_processing_activities: {
        Row: {
          activity_code: string
          activity_name: string
          article_6_lawful_bases: string[] | null
          created_at: string
          created_by: string | null
          criminal_offence_condition: string | null
          criminal_offence_data: boolean
          data_subject_categories: string[] | null
          description: string | null
          id: string
          international_transfer_required: boolean
          last_reviewed_at: string | null
          last_reviewed_by: string | null
          legitimate_interest_assessment_reference: string | null
          next_review_at: string | null
          owner_role: string | null
          owner_user_id: string | null
          personal_data_categories: string[] | null
          purpose: string | null
          recipients: string[] | null
          recognised_legitimate_interest: string | null
          related_transfer_ids: string[] | null
          retention_rule_id: string | null
          risk_level: string
          security_measures_summary: string | null
          special_category_condition: string | null
          special_category_data: boolean
          status: string
          systems_used: string[] | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          activity_code: string
          activity_name: string
          article_6_lawful_bases?: string[] | null
          created_at?: string
          created_by?: string | null
          criminal_offence_condition?: string | null
          criminal_offence_data?: boolean
          data_subject_categories?: string[] | null
          description?: string | null
          id?: string
          international_transfer_required?: boolean
          last_reviewed_at?: string | null
          last_reviewed_by?: string | null
          legitimate_interest_assessment_reference?: string | null
          next_review_at?: string | null
          owner_role?: string | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          purpose?: string | null
          recipients?: string[] | null
          recognised_legitimate_interest?: string | null
          related_transfer_ids?: string[] | null
          retention_rule_id?: string | null
          risk_level?: string
          security_measures_summary?: string | null
          special_category_condition?: string | null
          special_category_data?: boolean
          status?: string
          systems_used?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          activity_code?: string
          activity_name?: string
          article_6_lawful_bases?: string[] | null
          created_at?: string
          created_by?: string | null
          criminal_offence_condition?: string | null
          criminal_offence_data?: boolean
          data_subject_categories?: string[] | null
          description?: string | null
          id?: string
          international_transfer_required?: boolean
          last_reviewed_at?: string | null
          last_reviewed_by?: string | null
          legitimate_interest_assessment_reference?: string | null
          next_review_at?: string | null
          owner_role?: string | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          purpose?: string | null
          recipients?: string[] | null
          recognised_legitimate_interest?: string | null
          related_transfer_ids?: string[] | null
          retention_rule_id?: string | null
          risk_level?: string
          security_measures_summary?: string | null
          special_category_condition?: string | null
          special_category_data?: boolean
          status?: string
          systems_used?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ppa_retention_rule_fk"
            columns: ["retention_rule_id"]
            isOneToOne: false
            referencedRelation: "privacy_retention_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_retention_holds: {
        Row: {
          applied_at: string
          applied_by: string | null
          created_at: string
          detailed_reason: string | null
          hold_reference: string
          id: string
          reason: string
          record_categories: string[] | null
          release_reason: string | null
          released_at: string | null
          released_by: string | null
          review_at: string | null
          scope_id: string | null
          scope_type: string
          status: string
          supporting_document_reference: string | null
          updated_at: string
        }
        Insert: {
          applied_at?: string
          applied_by?: string | null
          created_at?: string
          detailed_reason?: string | null
          hold_reference: string
          id?: string
          reason: string
          record_categories?: string[] | null
          release_reason?: string | null
          released_at?: string | null
          released_by?: string | null
          review_at?: string | null
          scope_id?: string | null
          scope_type: string
          status?: string
          supporting_document_reference?: string | null
          updated_at?: string
        }
        Update: {
          applied_at?: string
          applied_by?: string | null
          created_at?: string
          detailed_reason?: string | null
          hold_reference?: string
          id?: string
          reason?: string
          record_categories?: string[] | null
          release_reason?: string | null
          released_at?: string | null
          released_by?: string | null
          review_at?: string | null
          scope_id?: string | null
          scope_type?: string
          status?: string
          supporting_document_reference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      privacy_retention_reviews: {
        Row: {
          audit_event_id: string | null
          completed_at: string | null
          created_at: string
          decision: string | null
          decision_reason: string | null
          deferred_until: string | null
          hold_id: string | null
          hold_status: string | null
          id: string
          proposed_action: string | null
          record_id: string | null
          record_summary: string | null
          record_type: string | null
          related_donation_id: string | null
          related_project_id: string | null
          retention_rule_id: string | null
          review_due_at: string | null
          review_reference: string
          reviewed_at: string | null
          reviewed_by: string | null
          sensitivity: string
          status: string
          subject_user_id: string | null
          updated_at: string
        }
        Insert: {
          audit_event_id?: string | null
          completed_at?: string | null
          created_at?: string
          decision?: string | null
          decision_reason?: string | null
          deferred_until?: string | null
          hold_id?: string | null
          hold_status?: string | null
          id?: string
          proposed_action?: string | null
          record_id?: string | null
          record_summary?: string | null
          record_type?: string | null
          related_donation_id?: string | null
          related_project_id?: string | null
          retention_rule_id?: string | null
          review_due_at?: string | null
          review_reference: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sensitivity?: string
          status?: string
          subject_user_id?: string | null
          updated_at?: string
        }
        Update: {
          audit_event_id?: string | null
          completed_at?: string | null
          created_at?: string
          decision?: string | null
          decision_reason?: string | null
          deferred_until?: string | null
          hold_id?: string | null
          hold_status?: string | null
          id?: string
          proposed_action?: string | null
          record_id?: string | null
          record_summary?: string | null
          record_type?: string | null
          related_donation_id?: string | null
          related_project_id?: string | null
          retention_rule_id?: string | null
          review_due_at?: string | null
          review_reference?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sensitivity?: string
          status?: string
          subject_user_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "privacy_retention_reviews_hold_id_fkey"
            columns: ["hold_id"]
            isOneToOne: false
            referencedRelation: "privacy_retention_holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "privacy_retention_reviews_retention_rule_id_fkey"
            columns: ["retention_rule_id"]
            isOneToOne: false
            referencedRelation: "privacy_retention_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_retention_rules: {
        Row: {
          active: boolean
          approved_at: string | null
          approved_by: string | null
          automatic_deletion_allowed: boolean
          created_at: string
          default_retention_unit: string
          default_retention_value: number | null
          description: string | null
          id: string
          last_reviewed_at: string | null
          legal_or_governance_reason: string | null
          next_review_at: string | null
          notes: string | null
          ordinary_action: string
          record_category: string
          related_privacy_notice_section: string | null
          retention_start_event: string | null
          review_required: boolean
          rule_code: string
          sensitive_exclusion: boolean
          updated_at: string
          version: number
        }
        Insert: {
          active?: boolean
          approved_at?: string | null
          approved_by?: string | null
          automatic_deletion_allowed?: boolean
          created_at?: string
          default_retention_unit: string
          default_retention_value?: number | null
          description?: string | null
          id?: string
          last_reviewed_at?: string | null
          legal_or_governance_reason?: string | null
          next_review_at?: string | null
          notes?: string | null
          ordinary_action: string
          record_category: string
          related_privacy_notice_section?: string | null
          retention_start_event?: string | null
          review_required?: boolean
          rule_code: string
          sensitive_exclusion?: boolean
          updated_at?: string
          version?: number
        }
        Update: {
          active?: boolean
          approved_at?: string | null
          approved_by?: string | null
          automatic_deletion_allowed?: boolean
          created_at?: string
          default_retention_unit?: string
          default_retention_value?: number | null
          description?: string | null
          id?: string
          last_reviewed_at?: string | null
          legal_or_governance_reason?: string | null
          next_review_at?: string | null
          notes?: string | null
          ordinary_action?: string
          record_category?: string
          related_privacy_notice_section?: string | null
          retention_start_event?: string | null
          review_required?: boolean
          rule_code?: string
          sensitive_exclusion?: boolean
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      privacy_service_providers: {
        Row: {
          breach_notification_terms: string | null
          contract_end_date: string | null
          contract_reference: string | null
          contract_start_date: string | null
          contract_status: string
          created_at: string
          created_by: string | null
          data_processing_terms_status: string | null
          data_subject_categories: string[] | null
          deletion_or_return_terms: string | null
          hosting_countries: string[] | null
          id: string
          international_transfer: boolean
          next_review_at: string | null
          notes: string | null
          owner_user_id: string | null
          personal_data_categories: string[] | null
          processing_countries: string[] | null
          processing_purpose: string | null
          provider_name: string
          provider_role: string
          related_transfer_id: string | null
          risk_level: string
          security_review_date: string | null
          security_review_status: string
          service_description: string | null
          special_category_access: boolean
          status: string
          subprocessor_information: string | null
          subprocessor_use: boolean
          supporting_document_id: string | null
          systems_or_products: string[] | null
          transfer_mechanism: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          breach_notification_terms?: string | null
          contract_end_date?: string | null
          contract_reference?: string | null
          contract_start_date?: string | null
          contract_status?: string
          created_at?: string
          created_by?: string | null
          data_processing_terms_status?: string | null
          data_subject_categories?: string[] | null
          deletion_or_return_terms?: string | null
          hosting_countries?: string[] | null
          id?: string
          international_transfer?: boolean
          next_review_at?: string | null
          notes?: string | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          processing_countries?: string[] | null
          processing_purpose?: string | null
          provider_name: string
          provider_role: string
          related_transfer_id?: string | null
          risk_level?: string
          security_review_date?: string | null
          security_review_status?: string
          service_description?: string | null
          special_category_access?: boolean
          status?: string
          subprocessor_information?: string | null
          subprocessor_use?: boolean
          supporting_document_id?: string | null
          systems_or_products?: string[] | null
          transfer_mechanism?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          breach_notification_terms?: string | null
          contract_end_date?: string | null
          contract_reference?: string | null
          contract_start_date?: string | null
          contract_status?: string
          created_at?: string
          created_by?: string | null
          data_processing_terms_status?: string | null
          data_subject_categories?: string[] | null
          deletion_or_return_terms?: string | null
          hosting_countries?: string[] | null
          id?: string
          international_transfer?: boolean
          next_review_at?: string | null
          notes?: string | null
          owner_user_id?: string | null
          personal_data_categories?: string[] | null
          processing_countries?: string[] | null
          processing_purpose?: string | null
          provider_name?: string
          provider_role?: string
          related_transfer_id?: string | null
          risk_level?: string
          security_review_date?: string | null
          security_review_status?: string
          service_description?: string | null
          special_category_access?: boolean
          status?: string
          subprocessor_information?: string | null
          subprocessor_use?: boolean
          supporting_document_id?: string | null
          systems_or_products?: string[] | null
          transfer_mechanism?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cookie_consent: boolean | null
          cookie_consent_date: string | null
          created_at: string
          data_processing_consent: boolean | null
          data_processing_consent_date: string | null
          email: string
          first_name: string
          gdpr_consent: boolean
          id: string
          last_name: string
          marketing_consent: boolean | null
          two_factor_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          cookie_consent?: boolean | null
          cookie_consent_date?: string | null
          created_at?: string
          data_processing_consent?: boolean | null
          data_processing_consent_date?: string | null
          email: string
          first_name: string
          gdpr_consent?: boolean
          id: string
          last_name: string
          marketing_consent?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          cookie_consent?: boolean | null
          cookie_consent_date?: string | null
          created_at?: string
          data_processing_consent?: boolean | null
          data_processing_consent_date?: string | null
          email?: string
          first_name?: string
          gdpr_consent?: boolean
          id?: string
          last_name?: string
          marketing_consent?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      project_agreement_decisions: {
        Row: {
          comment: string | null
          decided_at: string
          decision: Database["public"]["Enums"]["agreement_decision"]
          id: string
          project_id: string
          role: string
          user_id: string
          version_id: string
        }
        Insert: {
          comment?: string | null
          decided_at?: string
          decision: Database["public"]["Enums"]["agreement_decision"]
          id?: string
          project_id: string
          role: string
          user_id: string
          version_id: string
        }
        Update: {
          comment?: string | null
          decided_at?: string
          decision?: Database["public"]["Enums"]["agreement_decision"]
          id?: string
          project_id?: string
          role?: string
          user_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_agreement_decisions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_agreement_decisions_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "project_agreement_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      project_agreement_milestones: {
        Row: {
          created_at: string
          id: string
          sequence: number
          target_date: string | null
          title: string
          version_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          sequence?: number
          target_date?: string | null
          title: string
          version_id: string
          weight?: number
        }
        Update: {
          created_at?: string
          id?: string
          sequence?: number
          target_date?: string | null
          title?: string
          version_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_agreement_milestones_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "project_agreement_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      project_agreement_versions: {
        Row: {
          agreement_id: string
          beneficiary_group: string | null
          budget_categories: Json | null
          change_control_procedure: string | null
          communication_arrangements: string | null
          complaint_procedure: string | null
          confidentiality_terms: string | null
          created_at: string
          deliverables: string | null
          delivery_allocation: number | null
          dependencies: string | null
          donor_visible_status: string | null
          escalation_procedure: string | null
          evidence_requirements: string | null
          exclusions: string | null
          expected_duration: string | null
          financial_reporting: string | null
          first_report_due: string | null
          funding_target: number | null
          gross_donation: number | null
          id: string
          intended_outcomes: string | null
          is_donor_accepted: boolean | null
          is_team_accepted: boolean | null
          is_trust_approved: boolean | null
          issued_at: string | null
          issued_by: string | null
          operating_allocation: number | null
          planned_completion: string | null
          planned_start: string | null
          project_id: string
          purpose: string | null
          reporting_frequency: string | null
          risks_private: string | null
          safe_location: string | null
          safeguarding_route: string | null
          scope: string | null
          title: string
          updated_at: string
          version_number: number
        }
        Insert: {
          agreement_id: string
          beneficiary_group?: string | null
          budget_categories?: Json | null
          change_control_procedure?: string | null
          communication_arrangements?: string | null
          complaint_procedure?: string | null
          confidentiality_terms?: string | null
          created_at?: string
          deliverables?: string | null
          delivery_allocation?: number | null
          dependencies?: string | null
          donor_visible_status?: string | null
          escalation_procedure?: string | null
          evidence_requirements?: string | null
          exclusions?: string | null
          expected_duration?: string | null
          financial_reporting?: string | null
          first_report_due?: string | null
          funding_target?: number | null
          gross_donation?: number | null
          id?: string
          intended_outcomes?: string | null
          is_donor_accepted?: boolean | null
          is_team_accepted?: boolean | null
          is_trust_approved?: boolean | null
          issued_at?: string | null
          issued_by?: string | null
          operating_allocation?: number | null
          planned_completion?: string | null
          planned_start?: string | null
          project_id: string
          purpose?: string | null
          reporting_frequency?: string | null
          risks_private?: string | null
          safe_location?: string | null
          safeguarding_route?: string | null
          scope?: string | null
          title: string
          updated_at?: string
          version_number: number
        }
        Update: {
          agreement_id?: string
          beneficiary_group?: string | null
          budget_categories?: Json | null
          change_control_procedure?: string | null
          communication_arrangements?: string | null
          complaint_procedure?: string | null
          confidentiality_terms?: string | null
          created_at?: string
          deliverables?: string | null
          delivery_allocation?: number | null
          dependencies?: string | null
          donor_visible_status?: string | null
          escalation_procedure?: string | null
          evidence_requirements?: string | null
          exclusions?: string | null
          expected_duration?: string | null
          financial_reporting?: string | null
          first_report_due?: string | null
          funding_target?: number | null
          gross_donation?: number | null
          id?: string
          intended_outcomes?: string | null
          is_donor_accepted?: boolean | null
          is_team_accepted?: boolean | null
          is_trust_approved?: boolean | null
          issued_at?: string | null
          issued_by?: string | null
          operating_allocation?: number | null
          planned_completion?: string | null
          planned_start?: string | null
          project_id?: string
          purpose?: string | null
          reporting_frequency?: string | null
          risks_private?: string | null
          safe_location?: string | null
          safeguarding_route?: string | null
          scope?: string | null
          title?: string
          updated_at?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_agreement_versions_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "project_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_agreement_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_agreements: {
        Row: {
          activated_at: string | null
          created_at: string
          current_version_id: string | null
          id: string
          project_id: string
          status: Database["public"]["Enums"]["agreement_status"]
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          current_version_id?: string | null
          id?: string
          project_id: string
          status?: Database["public"]["Enums"]["agreement_status"]
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          current_version_id?: string | null
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["agreement_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_agreements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_change_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          decision_reason: string | null
          donor_visible: boolean | null
          field: string
          from_version_id: string | null
          id: string
          original_value: Json | null
          project_id: string
          proposed_value: Json | null
          reason: string | null
          requested_at: string
          requested_by: string
          requested_by_role: string
          requires_donor_reacceptance: boolean | null
          requires_team_reacceptance: boolean | null
          resulting_version_id: string | null
          status: Database["public"]["Enums"]["change_request_status"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          decision_reason?: string | null
          donor_visible?: boolean | null
          field: string
          from_version_id?: string | null
          id?: string
          original_value?: Json | null
          project_id: string
          proposed_value?: Json | null
          reason?: string | null
          requested_at?: string
          requested_by: string
          requested_by_role: string
          requires_donor_reacceptance?: boolean | null
          requires_team_reacceptance?: boolean | null
          resulting_version_id?: string | null
          status?: Database["public"]["Enums"]["change_request_status"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          decision_reason?: string | null
          donor_visible?: boolean | null
          field?: string
          from_version_id?: string | null
          id?: string
          original_value?: Json | null
          project_id?: string
          proposed_value?: Json | null
          reason?: string | null
          requested_at?: string
          requested_by?: string
          requested_by_role?: string
          requires_donor_reacceptance?: boolean | null
          requires_team_reacceptance?: boolean | null
          resulting_version_id?: string | null
          status?: Database["public"]["Enums"]["change_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_change_requests_from_version_id_fkey"
            columns: ["from_version_id"]
            isOneToOne: false
            referencedRelation: "project_agreement_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_change_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_change_requests_resulting_version_id_fkey"
            columns: ["resulting_version_id"]
            isOneToOne: false
            referencedRelation: "project_agreement_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      project_comment_reads: {
        Row: {
          comment_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          comment_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_comment_reads_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "project_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      project_comments: {
        Row: {
          approval_status: string
          attachment_url: string | null
          author_id: string
          author_role: string
          body: string
          created_at: string
          edited_at: string | null
          id: string
          mentions: string[] | null
          parent_comment_id: string | null
          parent_id: string
          parent_type: Database["public"]["Enums"]["comment_parent_type"]
          project_id: string
          updated_at: string
          visibility: Database["public"]["Enums"]["comment_visibility"]
        }
        Insert: {
          approval_status?: string
          attachment_url?: string | null
          author_id: string
          author_role: string
          body: string
          created_at?: string
          edited_at?: string | null
          id?: string
          mentions?: string[] | null
          parent_comment_id?: string | null
          parent_id: string
          parent_type: Database["public"]["Enums"]["comment_parent_type"]
          project_id: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["comment_visibility"]
        }
        Update: {
          approval_status?: string
          attachment_url?: string | null
          author_id?: string
          author_role?: string
          body?: string
          created_at?: string
          edited_at?: string | null
          id?: string
          mentions?: string[] | null
          parent_comment_id?: string | null
          parent_id?: string
          parent_type?: Database["public"]["Enums"]["comment_parent_type"]
          project_id?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["comment_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "project_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "project_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          category: string
          created_at: string
          currency: string
          description: string | null
          donor_visible: boolean
          id: string
          incurred_on: string
          override_reason: string | null
          paid_at: string | null
          project_id: string
          receipt_url: string | null
          recorded_by: string | null
          rejection_reason: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          category: string
          created_at?: string
          currency?: string
          description?: string | null
          donor_visible?: boolean
          id?: string
          incurred_on?: string
          override_reason?: string | null
          paid_at?: string | null
          project_id: string
          receipt_url?: string | null
          recorded_by?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          donor_visible?: boolean
          id?: string
          incurred_on?: string
          override_reason?: string | null
          paid_at?: string | null
          project_id?: string
          receipt_url?: string | null
          recorded_by?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_expenses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_field_evidence: {
        Row: {
          activity_description: string | null
          approved_at: string | null
          approved_by: string | null
          approved_general_location: string | null
          caption: string | null
          consent_status: string
          created_at: string
          date_taken: string | null
          donor_visible: boolean
          expense_id: string | null
          id: string
          milestone_id: string | null
          project_id: string
          rejection_reason: string | null
          review_status: string
          safeguarding_status: string
          storage_path: string
          storage_path_sanitised: string | null
          updated_at: string
          uploaded_by: string | null
          withdrawal_reason: string | null
          withdrawn_at: string | null
        }
        Insert: {
          activity_description?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_general_location?: string | null
          caption?: string | null
          consent_status?: string
          created_at?: string
          date_taken?: string | null
          donor_visible?: boolean
          expense_id?: string | null
          id?: string
          milestone_id?: string | null
          project_id: string
          rejection_reason?: string | null
          review_status?: string
          safeguarding_status?: string
          storage_path: string
          storage_path_sanitised?: string | null
          updated_at?: string
          uploaded_by?: string | null
          withdrawal_reason?: string | null
          withdrawn_at?: string | null
        }
        Update: {
          activity_description?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_general_location?: string | null
          caption?: string | null
          consent_status?: string
          created_at?: string
          date_taken?: string | null
          donor_visible?: boolean
          expense_id?: string | null
          id?: string
          milestone_id?: string | null
          project_id?: string
          rejection_reason?: string | null
          review_status?: string
          safeguarding_status?: string
          storage_path?: string
          storage_path_sanitised?: string | null
          updated_at?: string
          uploaded_by?: string | null
          withdrawal_reason?: string | null
          withdrawn_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_field_evidence_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "project_expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_field_evidence_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "project_milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_field_evidence_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_health_snapshots: {
        Row: {
          created_at: string
          donor_visible_explanation: string | null
          health: Database["public"]["Enums"]["project_health_state"]
          id: string
          override_by: string | null
          override_reason: string | null
          project_id: string
          signals: Json | null
        }
        Insert: {
          created_at?: string
          donor_visible_explanation?: string | null
          health: Database["public"]["Enums"]["project_health_state"]
          id?: string
          override_by?: string | null
          override_reason?: string | null
          project_id: string
          signals?: Json | null
        }
        Update: {
          created_at?: string
          donor_visible_explanation?: string | null
          health?: Database["public"]["Enums"]["project_health_state"]
          id?: string
          override_by?: string | null
          override_reason?: string | null
          project_id?: string
          signals?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "project_health_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_messages: {
        Row: {
          approval_status: string
          attachments: Json | null
          body: string
          created_at: string
          id: string
          parent_message_id: string | null
          project_id: string
          read_at: string | null
          recipient_role: string | null
          recipient_user_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sender_id: string
          sender_role: string
          updated_at: string
          visibility: string
        }
        Insert: {
          approval_status?: string
          attachments?: Json | null
          body: string
          created_at?: string
          id?: string
          parent_message_id?: string | null
          project_id: string
          read_at?: string | null
          recipient_role?: string | null
          recipient_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_id: string
          sender_role: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          approval_status?: string
          attachments?: Json | null
          body?: string
          created_at?: string
          id?: string
          parent_message_id?: string | null
          project_id?: string
          read_at?: string | null
          recipient_role?: string | null
          recipient_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_id?: string
          sender_role?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "project_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          approved_by: string | null
          completed_at: string | null
          completion_date: string | null
          created_at: string
          donor_visible: boolean
          evidence_required: boolean
          id: string
          is_completed: boolean
          milestone_description: string | null
          milestone_title: string
          project_id: string
          sequence: number
          status: string
          target_date: string | null
          updated_at: string
          weight: number
        }
        Insert: {
          approved_by?: string | null
          completed_at?: string | null
          completion_date?: string | null
          created_at?: string
          donor_visible?: boolean
          evidence_required?: boolean
          id?: string
          is_completed?: boolean
          milestone_description?: string | null
          milestone_title: string
          project_id: string
          sequence?: number
          status?: string
          target_date?: string | null
          updated_at?: string
          weight?: number
        }
        Update: {
          approved_by?: string | null
          completed_at?: string | null
          completion_date?: string | null
          created_at?: string
          donor_visible?: boolean
          evidence_required?: boolean
          id?: string
          is_completed?: boolean
          milestone_description?: string | null
          milestone_title?: string
          project_id?: string
          sequence?: number
          status?: string
          target_date?: string | null
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_notifications: {
        Row: {
          body: string | null
          category: string
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          category: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          category?: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      project_service_policies: {
        Row: {
          acknowledge_minutes: number
          business_hours: Json | null
          created_at: string
          escalation_minutes: number
          first_response_minutes: number
          id: string
          priority: Database["public"]["Enums"]["service_request_priority"]
          published: boolean
          request_type: string
          resolution_minutes: number
          timezone: string
          updated_at: string
        }
        Insert: {
          acknowledge_minutes?: number
          business_hours?: Json | null
          created_at?: string
          escalation_minutes?: number
          first_response_minutes?: number
          id?: string
          priority: Database["public"]["Enums"]["service_request_priority"]
          published?: boolean
          request_type: string
          resolution_minutes?: number
          timezone?: string
          updated_at?: string
        }
        Update: {
          acknowledge_minutes?: number
          business_hours?: Json | null
          created_at?: string
          escalation_minutes?: number
          first_response_minutes?: number
          id?: string
          priority?: Database["public"]["Enums"]["service_request_priority"]
          published?: boolean
          request_type?: string
          resolution_minutes?: number
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_service_request_comments: {
        Row: {
          attachment_url: string | null
          author_id: string
          author_role: string
          body: string
          comment_type: Database["public"]["Enums"]["service_comment_type"]
          created_at: string
          id: string
          read_at: string | null
          request_id: string
          updated_at: string
          visibility: Database["public"]["Enums"]["comment_visibility"]
        }
        Insert: {
          attachment_url?: string | null
          author_id: string
          author_role: string
          body: string
          comment_type?: Database["public"]["Enums"]["service_comment_type"]
          created_at?: string
          id?: string
          read_at?: string | null
          request_id: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["comment_visibility"]
        }
        Update: {
          attachment_url?: string | null
          author_id?: string
          author_role?: string
          body?: string
          comment_type?: Database["public"]["Enums"]["service_comment_type"]
          created_at?: string
          id?: string
          read_at?: string | null
          request_id?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["comment_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "project_service_request_comments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "project_service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      project_service_request_events: {
        Row: {
          actor_id: string | null
          actor_role: string | null
          created_at: string
          detail: Json | null
          event_type: string
          id: string
          request_id: string
        }
        Insert: {
          actor_id?: string | null
          actor_role?: string | null
          created_at?: string
          detail?: Json | null
          event_type: string
          id?: string
          request_id: string
        }
        Update: {
          actor_id?: string | null
          actor_role?: string | null
          created_at?: string
          detail?: Json | null
          event_type?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_service_request_events_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "project_service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      project_service_requests: {
        Row: {
          assigned_team: string | null
          assigned_user_id: string | null
          category: string | null
          closed_at: string | null
          confidentiality_level: Database["public"]["Enums"]["service_request_confidentiality"]
          created_at: string
          description: string
          donation_id: string | null
          donor_visible: boolean | null
          escalated_at: string | null
          escalation_reason: string | null
          evidence_id: string | null
          expense_id: string | null
          first_responded_at: string | null
          first_response_due_at: string | null
          id: string
          last_response_at: string | null
          milestone_id: string | null
          priority: Database["public"]["Enums"]["service_request_priority"]
          project_id: string | null
          reference_number: string
          reopened_at: string | null
          request_type: string
          requester_assignment_id: string | null
          requester_role: string
          requester_user_id: string
          resolution_category: string | null
          resolution_due_at: string | null
          resolution_summary: string | null
          resolved_at: string | null
          satisfaction_feedback: string | null
          satisfaction_score: number | null
          severity: string | null
          status: Database["public"]["Enums"]["service_request_status"]
          subject: string
          updated_at: string
          waiting_on: string | null
        }
        Insert: {
          assigned_team?: string | null
          assigned_user_id?: string | null
          category?: string | null
          closed_at?: string | null
          confidentiality_level?: Database["public"]["Enums"]["service_request_confidentiality"]
          created_at?: string
          description: string
          donation_id?: string | null
          donor_visible?: boolean | null
          escalated_at?: string | null
          escalation_reason?: string | null
          evidence_id?: string | null
          expense_id?: string | null
          first_responded_at?: string | null
          first_response_due_at?: string | null
          id?: string
          last_response_at?: string | null
          milestone_id?: string | null
          priority?: Database["public"]["Enums"]["service_request_priority"]
          project_id?: string | null
          reference_number?: string
          reopened_at?: string | null
          request_type: string
          requester_assignment_id?: string | null
          requester_role: string
          requester_user_id: string
          resolution_category?: string | null
          resolution_due_at?: string | null
          resolution_summary?: string | null
          resolved_at?: string | null
          satisfaction_feedback?: string | null
          satisfaction_score?: number | null
          severity?: string | null
          status?: Database["public"]["Enums"]["service_request_status"]
          subject: string
          updated_at?: string
          waiting_on?: string | null
        }
        Update: {
          assigned_team?: string | null
          assigned_user_id?: string | null
          category?: string | null
          closed_at?: string | null
          confidentiality_level?: Database["public"]["Enums"]["service_request_confidentiality"]
          created_at?: string
          description?: string
          donation_id?: string | null
          donor_visible?: boolean | null
          escalated_at?: string | null
          escalation_reason?: string | null
          evidence_id?: string | null
          expense_id?: string | null
          first_responded_at?: string | null
          first_response_due_at?: string | null
          id?: string
          last_response_at?: string | null
          milestone_id?: string | null
          priority?: Database["public"]["Enums"]["service_request_priority"]
          project_id?: string | null
          reference_number?: string
          reopened_at?: string | null
          request_type?: string
          requester_assignment_id?: string | null
          requester_role?: string
          requester_user_id?: string
          resolution_category?: string | null
          resolution_due_at?: string | null
          resolution_summary?: string | null
          resolved_at?: string | null
          satisfaction_feedback?: string | null
          satisfaction_score?: number | null
          severity?: string | null
          status?: Database["public"]["Enums"]["service_request_status"]
          subject?: string
          updated_at?: string
          waiting_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_service_requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_service_requests_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "project_field_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_service_requests_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "project_expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_service_requests_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "project_milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_service_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_service_requests_requester_assignment_id_fkey"
            columns: ["requester_assignment_id"]
            isOneToOne: false
            referencedRelation: "volunteer_project_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          created_at: string
          created_by: string | null
          file_url: string | null
          id: string
          note_text: string | null
          project_id: string
          update_type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          note_text?: string | null
          project_id: string
          update_type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          note_text?: string | null
          project_id?: string
          update_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limit_tracking: {
        Row: {
          action_type: string
          attempt_count: number | null
          blocked_until: string | null
          created_at: string | null
          id: string
          ip_address: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          ip_address: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recovery_codes: {
        Row: {
          code: string
          created_at: string | null
          id: string
          used: boolean | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          used?: boolean | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      recurring_payment_arrangements: {
        Row: {
          amount_minor: number
          authorised_at: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string
          currency: string
          donor_id: string
          id: string
          interval: string
          originating_draft_id: string | null
          provider: string
          provider_customer_id: string | null
          provider_mandate_id: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_minor: number
          authorised_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          donor_id: string
          id?: string
          interval: string
          originating_draft_id?: string | null
          provider: string
          provider_customer_id?: string | null
          provider_mandate_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_minor?: number
          authorised_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          donor_id?: string
          id?: string
          interval?: string
          originating_draft_id?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_mandate_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_payment_arrangements_originating_draft_id_fkey"
            columns: ["originating_draft_id"]
            isOneToOne: false
            referencedRelation: "donation_drafts"
            referencedColumns: ["id"]
          },
        ]
      }
      refund_records: {
        Row: {
          allocation_impact_notes: string | null
          amount_minor: number
          approved_at: string | null
          approved_by: string | null
          completed_at: string | null
          donation_id: string
          full_refund: boolean
          id: string
          provider_refund_id: string | null
          reason: string
          requested_at: string
          requested_by: string | null
          status: string
        }
        Insert: {
          allocation_impact_notes?: string | null
          amount_minor: number
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          donation_id: string
          full_refund?: boolean
          id?: string
          provider_refund_id?: string | null
          reason: string
          requested_at?: string
          requested_by?: string | null
          status?: string
        }
        Update: {
          allocation_impact_notes?: string | null
          amount_minor?: number
          approved_at?: string | null
          approved_by?: string | null
          completed_at?: string | null
          donation_id?: string
          full_refund?: boolean
          id?: string
          provider_refund_id?: string | null
          reason?: string
          requested_at?: string
          requested_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "refund_records_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      rights_request_rate_limits: {
        Row: {
          contact_hash: string
          created_at: string
          id: string
          request_count: number
          window_start: string
        }
        Insert: {
          contact_hash: string
          created_at?: string
          id?: string
          request_count?: number
          window_start?: string
        }
        Update: {
          contact_hash?: string
          created_at?: string
          id?: string
          request_count?: number
          window_start?: string
        }
        Relationships: []
      }
      soft_optin_settings: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          collected_directly_recorded: boolean
          created_at: string
          enabled: boolean
          every_message_contains_opt_out_recorded: boolean
          evidence_notes: string | null
          id: string
          interest_or_support_recorded: boolean
          only_own_charitable_purposes_recorded: boolean
          opt_out_offered_at_collection_recorded: boolean
          qualifies_as_charity_recorded: boolean
          singleton: boolean
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          collected_directly_recorded?: boolean
          created_at?: string
          enabled?: boolean
          every_message_contains_opt_out_recorded?: boolean
          evidence_notes?: string | null
          id?: string
          interest_or_support_recorded?: boolean
          only_own_charitable_purposes_recorded?: boolean
          opt_out_offered_at_collection_recorded?: boolean
          qualifies_as_charity_recorded?: boolean
          singleton?: boolean
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          collected_directly_recorded?: boolean
          created_at?: string
          enabled?: boolean
          every_message_contains_opt_out_recorded?: boolean
          evidence_notes?: string | null
          id?: string
          interest_or_support_recorded?: boolean
          only_own_charitable_purposes_recorded?: boolean
          opt_out_offered_at_collection_recorded?: boolean
          qualifies_as_charity_recorded?: boolean
          singleton?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      system_alerts: {
        Row: {
          alert_type: string
          assigned_to: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          related_id: string | null
          related_type: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
          title: string
        }
        Insert: {
          alert_type: string
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          related_id?: string | null
          related_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string
          title: string
        }
        Update: {
          alert_type?: string
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          related_id?: string | null
          related_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      system_health_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_type: string
          metric_unit: string | null
          metric_value: number
          recorded_at: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_unit?: string | null
          metric_value: number
          recorded_at?: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_unit?: string | null
          metric_value?: number
          recorded_at?: string
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          created_at: string
          id: string
          log_type: string
          message: string
          metadata: Json | null
          related_id: string | null
          related_type: string | null
          severity: string
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          log_type: string
          message: string
          metadata?: Json | null
          related_id?: string | null
          related_type?: string | null
          severity: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          log_type?: string
          message?: string
          metadata?: Json | null
          related_id?: string | null
          related_type?: string | null
          severity?: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      two_factor_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          used: boolean | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          used?: boolean | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: string | null
          expires_at: string
          id: string
          ip_address: string | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      volunteer_account_invitations: {
        Row: {
          application_id: string
          consumed_at: string | null
          consumed_by_user_id: string | null
          created_at: string
          expires_at: string
          id: string
          invited_by: string
          invited_email: string
          role: Database["public"]["Enums"]["app_role"]
          token_hash: string
        }
        Insert: {
          application_id: string
          consumed_at?: string | null
          consumed_by_user_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invited_by: string
          invited_email: string
          role?: Database["public"]["Enums"]["app_role"]
          token_hash: string
        }
        Update: {
          application_id?: string
          consumed_at?: string | null
          consumed_by_user_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invited_by?: string
          invited_email?: string
          role?: Database["public"]["Enums"]["app_role"]
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_account_invitations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "volunteer_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_application_declarations: {
        Row: {
          application_id: string
          declaration_type: string
          declared_at: string
          id: string
          wording_version: string
        }
        Insert: {
          application_id: string
          declaration_type: string
          declared_at?: string
          id?: string
          wording_version: string
        }
        Update: {
          application_id?: string
          declaration_type?: string
          declared_at?: string
          id?: string
          wording_version?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_application_declarations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "volunteer_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_applications: {
        Row: {
          area_of_interest: string | null
          availability: string | null
          country: string | null
          created_at: string
          cv_mime_type: string | null
          cv_object_path: string | null
          cv_original_filename: string | null
          cv_size_bytes: number | null
          email: string
          experience: string | null
          id: string
          languages: string | null
          linked_volunteer_id: string | null
          motivation: string | null
          name: string
          phone: string | null
          reviewer_notes: string | null
          role_of_interest: string | null
          skills: string | null
          status: string
          submitted_by_user_id: string | null
          updated_at: string
        }
        Insert: {
          area_of_interest?: string | null
          availability?: string | null
          country?: string | null
          created_at?: string
          cv_mime_type?: string | null
          cv_object_path?: string | null
          cv_original_filename?: string | null
          cv_size_bytes?: number | null
          email: string
          experience?: string | null
          id?: string
          languages?: string | null
          linked_volunteer_id?: string | null
          motivation?: string | null
          name: string
          phone?: string | null
          reviewer_notes?: string | null
          role_of_interest?: string | null
          skills?: string | null
          status?: string
          submitted_by_user_id?: string | null
          updated_at?: string
        }
        Update: {
          area_of_interest?: string | null
          availability?: string | null
          country?: string | null
          created_at?: string
          cv_mime_type?: string | null
          cv_object_path?: string | null
          cv_original_filename?: string | null
          cv_size_bytes?: number | null
          email?: string
          experience?: string | null
          id?: string
          languages?: string | null
          linked_volunteer_id?: string | null
          motivation?: string | null
          name?: string
          phone?: string | null
          reviewer_notes?: string | null
          role_of_interest?: string | null
          skills?: string | null
          status?: string
          submitted_by_user_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_applications_linked_volunteer_id_fkey"
            columns: ["linked_volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_project_assignments: {
        Row: {
          assigned_role: string
          created_at: string
          donor_visibility_mode: string
          end_date: string | null
          id: string
          project_id: string
          responsibilities: string | null
          responsibilities_donor_visible: boolean
          start_date: string | null
          status: string
          updated_at: string
          volunteer_id: string
        }
        Insert: {
          assigned_role: string
          created_at?: string
          donor_visibility_mode?: string
          end_date?: string | null
          id?: string
          project_id: string
          responsibilities?: string | null
          responsibilities_donor_visible?: boolean
          start_date?: string | null
          status?: string
          updated_at?: string
          volunteer_id: string
        }
        Update: {
          assigned_role?: string
          created_at?: string
          donor_visibility_mode?: string
          end_date?: string | null
          id?: string
          project_id?: string
          responsibilities?: string | null
          responsibilities_donor_visible?: boolean
          start_date?: string | null
          status?: string
          updated_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_project_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_project_assignments_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_project_requests: {
        Row: {
          created_at: string
          id: string
          project_id: string
          status: string
          volunteer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          status?: string
          volunteer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          status?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_project_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_project_requests_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_updates: {
        Row: {
          created_at: string
          created_by: string | null
          file_url: string | null
          id: string
          note_text: string | null
          project_id: string
          update_type: string
          volunteer_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          note_text?: string | null
          project_id: string
          update_type: string
          volunteer_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          id?: string
          note_text?: string | null
          project_id?: string
          update_type?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "commissioned_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_updates_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          area_of_interest: string | null
          availability: string | null
          country: string
          created_at: string
          cv_url: string | null
          email: string
          experience: string
          id: string
          languages: string
          motivation: string | null
          name: string
          notes: string | null
          phone: string
          skills: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          area_of_interest?: string | null
          availability?: string | null
          country: string
          created_at?: string
          cv_url?: string | null
          email: string
          experience: string
          id?: string
          languages: string
          motivation?: string | null
          name: string
          notes?: string | null
          phone: string
          skills: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          area_of_interest?: string | null
          availability?: string | null
          country?: string
          created_at?: string
          cv_url?: string | null
          email?: string
          experience?: string
          id?: string
          languages?: string
          motivation?: string | null
          name?: string
          notes?: string | null
          phone?: string
          skills?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      my_gdpr_requests: {
        Row: {
          clarification_needed: boolean | null
          completed_at: string | null
          decision: string | null
          due_at: string | null
          extended_due_at: string | null
          id: string | null
          identity_action_needed: boolean | null
          received_at: string | null
          reference_number: string | null
          request_type: string | null
          status: string | null
        }
        Insert: {
          clarification_needed?: never
          completed_at?: string | null
          decision?: string | null
          due_at?: string | null
          extended_due_at?: string | null
          id?: string | null
          identity_action_needed?: never
          received_at?: string | null
          reference_number?: string | null
          request_type?: string | null
          status?: string | null
        }
        Update: {
          clarification_needed?: never
          completed_at?: string | null
          decision?: string | null
          due_at?: string | null
          extended_due_at?: string | null
          id?: string | null
          identity_action_needed?: never
          received_at?: string | null
          reference_number?: string | null
          request_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_donor_project_funding_terms: {
        Args: { _draft_id: string }
        Returns: string
      }
      add_service_request_comment: {
        Args: {
          _body: string
          _comment_type: Database["public"]["Enums"]["service_comment_type"]
          _request_id: string
          _visibility: Database["public"]["Enums"]["comment_visibility"]
        }
        Returns: string
      }
      admin_issue_agreement_version: {
        Args: { _agreement_id: string }
        Returns: undefined
      }
      anonymize_user_data: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      apply_unsubscribe_token: { Args: { _token: string }; Returns: Json }
      bank_transfer_record_receipt: {
        Args: {
          _amount_received_minor: number
          _bank_reference: string
          _received_at: string
          _reconciliation_notes: string
          _request_id: string
          _second_approver_id: string
        }
        Returns: string
      }
      can_access_project: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      can_manage_hvda: { Args: { _user_id: string }; Returns: boolean }
      compute_project_health: {
        Args: { _project_id: string }
        Returns: Database["public"]["Enums"]["project_health_state"]
      }
      compute_service_sla: {
        Args: {
          _priority: Database["public"]["Enums"]["service_request_priority"]
          _request_type: string
        }
        Returns: {
          first_response_due_at: string
          resolution_due_at: string
        }[]
      }
      confirm_service_resolution: {
        Args: { _feedback: string; _request_id: string; _score: number }
        Returns: undefined
      }
      create_service_request: {
        Args: {
          _category: string
          _confidentiality: Database["public"]["Enums"]["service_request_confidentiality"]
          _description: string
          _donation_id: string
          _evidence_id: string
          _expense_id: string
          _milestone_id: string
          _priority: Database["public"]["Enums"]["service_request_priority"]
          _project_id: string
          _request_type: string
          _subject: string
        }
        Returns: string
      }
      current_legal_version: {
        Args: { _slug: string }
        Returns: {
          acceptance_text: string
          body_markdown: string
          category: string
          document_id: string
          effective_date: string
          published_at: string
          requires_donation_acceptance: boolean
          requires_signup_acceptance: boolean
          requires_team_acceptance: boolean
          slug: string
          summary: string
          title: string
          version_id: string
          version_number: number
        }[]
      }
      donation_calculate_allocation: {
        Args: { _amount_minor: number }
        Returns: {
          delivery_minor: number
          operating_minor: number
        }[]
      }
      donation_confirm_transaction: {
        Args: { _draft_id: string; _wording_version: string }
        Returns: string
      }
      donation_draft_create: {
        Args: {
          _amount_minor: number
          _anonymous: boolean
          _frequency: Database["public"]["Enums"]["donation_frequency"]
          _notes: string
          _proposed_project_id: string
          _purpose: Database["public"]["Enums"]["donation_purpose"]
          _recognition_preference: string
        }
        Returns: string
      }
      donation_finalize_from_provider: {
        Args: {
          _amount_minor: number
          _draft_id: string
          _paid_at: string
          _payment_intent_id: string
          _payment_route: string
          _provider: string
          _subscription_id: string
        }
        Returns: string
      }
      donation_request_bank_transfer: {
        Args: { _draft_id: string }
        Returns: string
      }
      donor_can_view_volunteer: {
        Args: { _donor_id: string; _volunteer_id: string }
        Returns: boolean
      }
      donor_get_bank_details: {
        Args: { _draft_id: string }
        Returns: {
          account_number: string
          bank_name: string
          beneficiary_name: string
          bic: string
          iban: string
          instructions_notes: string
          show_details: boolean
          sort_code: string
        }[]
      }
      donor_project_agreement: {
        Args: { _project_id: string }
        Returns: {
          activated_at: string
          beneficiary_group: string
          budget_categories: Json
          communication_arrangements: string
          complaint_procedure: string
          confidentiality_terms: string
          deliverables: string
          delivery_allocation: number
          donor_visible_status: string
          evidence_requirements: string
          exclusions: string
          expected_duration: string
          financial_reporting: string
          first_report_due: string
          funding_target: number
          gross_donation: number
          intended_outcomes: string
          is_donor_accepted: boolean
          is_trust_approved: boolean
          issued_at: string
          operating_allocation: number
          planned_completion: string
          planned_start: string
          purpose: string
          reporting_frequency: string
          safe_location: string
          safeguarding_route: string
          scope: string
          status: Database["public"]["Enums"]["agreement_status"]
          title: string
          version_id: string
          version_number: number
        }[]
      }
      donor_project_team: {
        Args: { _project_ids: string[] }
        Returns: {
          assigned_role: string
          assignment_id: string
          display_name: string
          donor_visibility_mode: string
          project_id: string
          responsibilities: string
        }[]
      }
      export_user_data: { Args: { target_user_id: string }; Returns: Json }
      generate_bank_transfer_reference: { Args: never; Returns: string }
      generate_gdpr_reference: { Args: never; Returns: string }
      generate_hold_reference: { Args: never; Returns: string }
      generate_hvda_reference: { Args: never; Returns: string }
      generate_receipt_reference: { Args: never; Returns: string }
      generate_review_reference: { Args: never; Returns: string }
      generate_service_request_reference: { Args: never; Returns: string }
      generate_transfer_reference: { Args: never; Returns: string }
      gocardless_enabled: { Args: never; Returns: boolean }
      gocardless_prepare_arrangement: {
        Args: { _draft_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hvda_create_amendment: {
        Args: { _agreement_id: string; _reason: string; _summary: string }
        Returns: string
      }
      hvda_donor_safe_copy: { Args: { _agreement_id: string }; Returns: Json }
      hvda_open: {
        Args: {
          _designation_notes: string
          _donor_display_name: string
          _donor_user_id: string
          _reasons: Database["public"]["Enums"]["hvda_designation_reason"][]
          _related_draft_id: string
          _related_project_id: string
        }
        Returns: string
      }
      hvda_record_approval: {
        Args: {
          _agreement_id: string
          _approval_type: Database["public"]["Enums"]["hvda_approval_type"]
          _comment: string
          _decision: Database["public"]["Enums"]["hvda_approval_decision"]
          _reference: string
        }
        Returns: string
      }
      hvda_record_signature: {
        Args: {
          _agreement_id: string
          _evidence_reference: string
          _method: string
          _signatory_name: string
          _signatory_role: Database["public"]["Enums"]["hvda_signatory_role"]
          _signatory_title: string
          _signatory_user_id: string
        }
        Returns: string
      }
      hvda_set_status: {
        Args: {
          _agreement_id: string
          _new_status: Database["public"]["Enums"]["hvda_status"]
          _note: string
        }
        Returns: undefined
      }
      increment_document_download: {
        Args: { doc_id: string }
        Returns: undefined
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_finance_officer: { Args: { _user_id: string }; Returns: boolean }
      is_project_donor: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      is_project_team_member: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      is_safeguarding_officer: { Args: { _user_id: string }; Returns: boolean }
      legal_entity_is_verified: { Args: never; Returns: boolean }
      log_admin_action: {
        Args: {
          p_action: string
          p_action_type: string
          p_details?: Json
          p_target_id: string
          p_target_type: string
        }
        Returns: undefined
      }
      log_volunteer_cv_access: {
        Args: { _application_id: string }
        Returns: undefined
      }
      needs_legal_reacceptance: { Args: { _slug: string }; Returns: boolean }
      project_delivery_progress: {
        Args: { _project_id: string }
        Returns: number
      }
      publish_legal_version: { Args: { _version_id: string }; Returns: string }
      record_legal_acceptance: {
        Args: {
          _project_id?: string
          _role?: string
          _slug: string
          _user_agent?: string
        }
        Returns: string
      }
      record_legal_event: {
        Args: {
          _context?: string
          _event_type?: string
          _role?: string
          _slug: string
        }
        Returns: string
      }
      refund_request: {
        Args: { _amount_minor: number; _donation_id: string; _reason: string }
        Returns: string
      }
      reopen_service_request: {
        Args: { _reason: string; _request_id: string }
        Returns: undefined
      }
      resolve_service_request: {
        Args: { _category: string; _request_id: string; _summary: string }
        Returns: undefined
      }
      retention_review_blocking_hold: {
        Args: { _review_id: string }
        Returns: boolean
      }
      rr_add_event: {
        Args: { _detail?: Json; _event_type: string; _request_id: string }
        Returns: string
      }
      rr_apply_extension: {
        Args: { _months?: number; _reason: string; _request_id: string }
        Returns: undefined
      }
      rr_generate_due_review_candidates: {
        Args: never
        Returns: {
          candidates_created: number
          rule_code: string
          unmapped: boolean
        }[]
      }
      rr_record_extension_notification: {
        Args: {
          _channel: string
          _note?: string
          _notified_at: string
          _request_id: string
        }
        Returns: undefined
      }
      rr_review_create:
        | {
            Args: {
              _proposed_action: string
              _record_id: string
              _record_summary: string
              _record_type: string
              _related_donation_id: string
              _related_project_id: string
              _retention_rule_id: string
              _review_due_at: string
              _sensitivity: string
              _subject_user_id: string
            }
            Returns: string
          }
        | {
            Args: {
              _proposed_action?: string
              _record_id: string
              _record_summary: string
              _record_type: string
              _related_donation_id?: string
              _related_project_id?: string
              _review_due_at?: string
              _rule_code: string
              _sensitivity?: string
              _subject_user_id?: string
            }
            Returns: string
          }
      rr_review_decide: {
        Args: {
          _decision: string
          _decision_reason: string
          _deferred_until?: string
          _review_id: string
        }
        Returns: undefined
      }
      rr_set_clock_start: {
        Args: { _request_id: string; _start: string }
        Returns: undefined
      }
      submit_agreement_decision: {
        Args: {
          _comment: string
          _decision: Database["public"]["Enums"]["agreement_decision"]
          _version_id: string
        }
        Returns: string
      }
      submit_rights_request: {
        Args: {
          _channel?: string
          _representative_name?: string
          _request_description: string
          _request_type: string
          _requester_contact: string
          _requester_name: string
        }
        Returns: string
      }
      submit_volunteer_application: {
        Args: {
          _accuracy_version: string
          _area_of_interest: string
          _availability: string
          _country: string
          _cv_mime_type: string
          _cv_object_path: string
          _cv_original_filename: string
          _cv_size_bytes: number
          _email: string
          _experience: string
          _languages: string
          _motivation: string
          _name: string
          _phone: string
          _privacy_version: string
          _role_of_interest: string
          _skills: string
        }
        Returns: string
      }
      team_project_agreement: {
        Args: { _project_id: string }
        Returns: {
          activated_at: string
          beneficiary_group: string
          budget_categories: Json
          communication_arrangements: string
          deliverables: string
          delivery_allocation: number
          dependencies: string
          escalation_procedure: string
          evidence_requirements: string
          exclusions: string
          expected_duration: string
          first_report_due: string
          intended_outcomes: string
          is_team_accepted: boolean
          is_trust_approved: boolean
          issued_at: string
          planned_completion: string
          planned_start: string
          purpose: string
          reporting_frequency: string
          safe_location: string
          safeguarding_route: string
          scope: string
          status: Database["public"]["Enums"]["agreement_status"]
          title: string
          version_id: string
          version_number: number
        }[]
      }
    }
    Enums: {
      agreement_decision:
        | "accept"
        | "request_changes"
        | "decline"
        | "trust_approve"
      agreement_status:
        | "draft"
        | "issued"
        | "under_review"
        | "changes_requested"
        | "revised"
        | "accepted"
        | "active"
        | "superseded"
        | "terminated"
      app_role:
        | "donor"
        | "admin"
        | "super_admin"
        | "volunteer"
        | "safeguarding_officer"
        | "finance_officer"
      change_request_status:
        | "proposed"
        | "under_review"
        | "clarification_required"
        | "approved"
        | "rejected"
        | "withdrawn"
        | "implemented"
      comment_parent_type:
        | "charter"
        | "agreement_version"
        | "milestone"
        | "project_update"
        | "expense"
        | "evidence"
        | "change_request"
        | "reporting_deadline"
        | "service_request"
      comment_visibility:
        | "trust_internal"
        | "donor_trust"
        | "team_trust"
        | "shared_project"
        | "safeguarding_restricted"
        | "finance_restricted"
      donation_frequency: "one_time" | "monthly" | "quarterly" | "annually"
      donation_purpose:
        | "healthcare_access"
        | "humanitarian_crisis"
        | "research_policy"
        | "professional_education"
        | "where_most_needed"
      hvda_approval_decision:
        | "approved"
        | "changes_requested"
        | "declined"
        | "noted"
      hvda_approval_type:
        | "due_diligence"
        | "trustee_review"
        | "legal_review"
        | "approved_for_signature"
      hvda_condition_status: "open" | "satisfied" | "waived" | "failed"
      hvda_designation_reason:
        | "amount"
        | "donor_profile"
        | "restrictions"
        | "source_of_funds"
        | "complexity"
        | "international_features"
        | "reputational_risk"
        | "payment_schedule"
        | "project_dependency"
      hvda_signatory_role: "donor" | "trust"
      hvda_status:
        | "draft"
        | "due_diligence"
        | "trustee_review"
        | "legal_review_requested"
        | "approved_for_signature"
        | "signed"
        | "active"
        | "completed"
        | "terminated"
      legal_review_status:
        | "draft"
        | "internal_review"
        | "solicitor_review"
        | "trustee_approved"
        | "published"
        | "superseded"
      message_status: "unread" | "read" | "archived"
      project_health_state:
        | "on_track"
        | "attention_required"
        | "at_risk"
        | "off_track"
        | "on_hold"
        | "completed"
        | "cancelled"
      service_comment_type:
        | "requester_comment"
        | "trust_response"
        | "internal_note"
        | "request_for_information"
        | "decision"
        | "resolution"
        | "escalation_note"
        | "safeguarding_note"
      service_request_confidentiality:
        | "standard"
        | "restricted_safeguarding"
        | "restricted_finance"
        | "identity_restricted"
      service_request_priority:
        | "routine"
        | "normal"
        | "high"
        | "urgent"
        | "critical"
      service_request_status:
        | "new"
        | "triage"
        | "assigned"
        | "investigating"
        | "awaiting_trust"
        | "awaiting_donor"
        | "awaiting_project_team"
        | "awaiting_third_party"
        | "proposed_resolution"
        | "resolved"
        | "closed"
        | "reopened"
        | "escalated"
    }
    CompositeTypes: {
      [_ in never]: never
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
      agreement_decision: [
        "accept",
        "request_changes",
        "decline",
        "trust_approve",
      ],
      agreement_status: [
        "draft",
        "issued",
        "under_review",
        "changes_requested",
        "revised",
        "accepted",
        "active",
        "superseded",
        "terminated",
      ],
      app_role: [
        "donor",
        "admin",
        "super_admin",
        "volunteer",
        "safeguarding_officer",
        "finance_officer",
      ],
      change_request_status: [
        "proposed",
        "under_review",
        "clarification_required",
        "approved",
        "rejected",
        "withdrawn",
        "implemented",
      ],
      comment_parent_type: [
        "charter",
        "agreement_version",
        "milestone",
        "project_update",
        "expense",
        "evidence",
        "change_request",
        "reporting_deadline",
        "service_request",
      ],
      comment_visibility: [
        "trust_internal",
        "donor_trust",
        "team_trust",
        "shared_project",
        "safeguarding_restricted",
        "finance_restricted",
      ],
      donation_frequency: ["one_time", "monthly", "quarterly", "annually"],
      donation_purpose: [
        "healthcare_access",
        "humanitarian_crisis",
        "research_policy",
        "professional_education",
        "where_most_needed",
      ],
      hvda_approval_decision: [
        "approved",
        "changes_requested",
        "declined",
        "noted",
      ],
      hvda_approval_type: [
        "due_diligence",
        "trustee_review",
        "legal_review",
        "approved_for_signature",
      ],
      hvda_condition_status: ["open", "satisfied", "waived", "failed"],
      hvda_designation_reason: [
        "amount",
        "donor_profile",
        "restrictions",
        "source_of_funds",
        "complexity",
        "international_features",
        "reputational_risk",
        "payment_schedule",
        "project_dependency",
      ],
      hvda_signatory_role: ["donor", "trust"],
      hvda_status: [
        "draft",
        "due_diligence",
        "trustee_review",
        "legal_review_requested",
        "approved_for_signature",
        "signed",
        "active",
        "completed",
        "terminated",
      ],
      legal_review_status: [
        "draft",
        "internal_review",
        "solicitor_review",
        "trustee_approved",
        "published",
        "superseded",
      ],
      message_status: ["unread", "read", "archived"],
      project_health_state: [
        "on_track",
        "attention_required",
        "at_risk",
        "off_track",
        "on_hold",
        "completed",
        "cancelled",
      ],
      service_comment_type: [
        "requester_comment",
        "trust_response",
        "internal_note",
        "request_for_information",
        "decision",
        "resolution",
        "escalation_note",
        "safeguarding_note",
      ],
      service_request_confidentiality: [
        "standard",
        "restricted_safeguarding",
        "restricted_finance",
        "identity_restricted",
      ],
      service_request_priority: [
        "routine",
        "normal",
        "high",
        "urgent",
        "critical",
      ],
      service_request_status: [
        "new",
        "triage",
        "assigned",
        "investigating",
        "awaiting_trust",
        "awaiting_donor",
        "awaiting_project_team",
        "awaiting_third_party",
        "proposed_resolution",
        "resolved",
        "closed",
        "reopened",
        "escalated",
      ],
    },
  },
} as const

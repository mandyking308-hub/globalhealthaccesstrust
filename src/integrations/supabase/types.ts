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
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_id: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          notes: string | null
          processed_at: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_url: string | null
          status: string
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          processed_at?: string | null
          purpose: Database["public"]["Enums"]["donation_purpose"]
          receipt_url?: string | null
          status?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          processed_at?: string | null
          purpose?: Database["public"]["Enums"]["donation_purpose"]
          receipt_url?: string | null
          status?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: []
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
      gdpr_requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          request_details: string | null
          request_type: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_details?: string | null
          request_type: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_details?: string | null
          request_type?: string
          status?: string
          user_id?: string
        }
        Relationships: []
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
      [_ in never]: never
    }
    Functions: {
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
      can_access_project: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
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
      donor_can_view_volunteer: {
        Args: { _donor_id: string; _volunteer_id: string }
        Returns: boolean
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
      generate_service_request_reference: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
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
      project_delivery_progress: {
        Args: { _project_id: string }
        Returns: number
      }
      reopen_service_request: {
        Args: { _reason: string; _request_id: string }
        Returns: undefined
      }
      resolve_service_request: {
        Args: { _category: string; _request_id: string; _summary: string }
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

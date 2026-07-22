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
      anonymize_user_data: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      can_access_project: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      donor_can_view_volunteer: {
        Args: { _donor_id: string; _volunteer_id: string }
        Returns: boolean
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
    }
    Enums: {
      app_role:
        | "donor"
        | "admin"
        | "super_admin"
        | "volunteer"
        | "safeguarding_officer"
        | "finance_officer"
      donation_frequency: "one_time" | "monthly" | "quarterly" | "annually"
      donation_purpose:
        | "healthcare_access"
        | "humanitarian_crisis"
        | "research_policy"
        | "professional_education"
        | "where_most_needed"
      message_status: "unread" | "read" | "archived"
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
      app_role: [
        "donor",
        "admin",
        "super_admin",
        "volunteer",
        "safeguarding_officer",
        "finance_officer",
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
    },
  },
} as const

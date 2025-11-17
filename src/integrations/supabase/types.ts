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
          budget_range: string
          country: string
          created_at: string
          dedication: string | null
          description: string
          donor_id: string
          end_date: string | null
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
          budget_range: string
          country: string
          created_at?: string
          dedication?: string | null
          description: string
          donor_id: string
          end_date?: string | null
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
          budget_range?: string
          country?: string
          created_at?: string
          dedication?: string | null
          description?: string
          donor_id?: string
          end_date?: string | null
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
          project_name: string
        }
        Insert: {
          allocated_by?: string | null
          amount: number
          created_at?: string
          donation_id: string
          id?: string
          notes?: string | null
          project_name: string
        }
        Update: {
          allocated_by?: string | null
          amount?: number
          created_at?: string
          donation_id?: string
          id?: string
          notes?: string | null
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
        ]
      }
      gdpr_requests: {
        Row: {
          created_at: string
          id: string
          processed_at: string | null
          processed_by: string | null
          request_type: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_type: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_type?: string
          status?: string
          user_id?: string
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
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string
          gdpr_consent: boolean
          id: string
          last_name: string
          two_factor_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          gdpr_consent?: boolean
          id: string
          last_name: string
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          gdpr_consent?: boolean
          id?: string
          last_name?: string
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      project_milestones: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean
          milestone_description: string | null
          milestone_title: string
          project_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          milestone_description?: string | null
          milestone_title: string
          project_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          milestone_description?: string | null
          milestone_title?: string
          project_id?: string
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
          id: string
          project_id: string
          volunteer_id: string
        }
        Insert: {
          assigned_role: string
          created_at?: string
          id?: string
          project_id: string
          volunteer_id: string
        }
        Update: {
          assigned_role?: string
          created_at?: string
          id?: string
          project_id?: string
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
          country: string
          created_at: string
          cv_url: string | null
          email: string
          experience: string
          id: string
          languages: string
          name: string
          notes: string | null
          phone: string
          skills: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          country: string
          created_at?: string
          cv_url?: string | null
          email: string
          experience: string
          id?: string
          languages: string
          name: string
          notes?: string | null
          phone: string
          skills: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          cv_url?: string | null
          email?: string
          experience?: string
          id?: string
          languages?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
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
    }
    Enums: {
      app_role: "donor" | "admin" | "super_admin"
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
      app_role: ["donor", "admin", "super_admin"],
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

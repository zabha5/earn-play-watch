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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      earnings: {
        Row: {
          amount: number
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_type"]
          id: string
          reference_id: string | null
          source: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: Database["public"]["Enums"]["currency_type"]
          id?: string
          reference_id?: string | null
          source: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_type"]
          id?: string
          reference_id?: string | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      payout_requests: {
        Row: {
          admin_notes: string | null
          amount: number
          currency: Database["public"]["Enums"]["currency_type"]
          id: string
          payment_details: Json
          payment_method: string
          processed_at: string | null
          processed_by: string | null
          requested_at: string | null
          status: Database["public"]["Enums"]["payout_status"] | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          currency: Database["public"]["Enums"]["currency_type"]
          id?: string
          payment_details: Json
          payment_method: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"] | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          currency?: Database["public"]["Enums"]["currency_type"]
          id?: string
          payment_details?: Json
          payment_method?: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"] | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          can_withdraw: boolean | null
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_type"] | null
          email: string
          full_name: string | null
          id: string
          last_watch_date: string | null
          referral_code: string
          referral_count: number | null
          referred_by: string | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
          videos_watched_today: number | null
        }
        Insert: {
          can_withdraw?: boolean | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          email: string
          full_name?: string | null
          id?: string
          last_watch_date?: string | null
          referral_code?: string
          referral_count?: number | null
          referred_by?: string | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
          videos_watched_today?: number | null
        }
        Update: {
          can_withdraw?: boolean | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          email?: string
          full_name?: string | null
          id?: string
          last_watch_date?: string | null
          referral_code?: string
          referral_count?: number | null
          referred_by?: string | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
          videos_watched_today?: number | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_earned: number | null
          created_at: string | null
          id: string
          referral_code: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          bonus_earned?: number | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          bonus_earned?: number | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_watches: {
        Row: {
          completed: boolean | null
          currency: Database["public"]["Enums"]["currency_type"] | null
          earned_amount: number | null
          id: string
          user_id: string
          video_id: string
          watch_duration: number
          watched_at: string | null
        }
        Insert: {
          completed?: boolean | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          earned_amount?: number | null
          id?: string
          user_id: string
          video_id: string
          watch_duration: number
          watched_at?: string | null
        }
        Update: {
          completed?: boolean | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          earned_amount?: number | null
          id?: string
          user_id?: string
          video_id?: string
          watch_duration?: number
          watched_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_watches_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_type"] | null
          embed_url: string
          id: string
          is_active: boolean | null
          platform: Database["public"]["Enums"]["video_platform"]
          reward_amount: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          embed_url: string
          id?: string
          is_active?: boolean | null
          platform: Database["public"]["Enums"]["video_platform"]
          reward_amount?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_type"] | null
          embed_url?: string
          id?: string
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["video_platform"]
          reward_amount?: number | null
          title?: string
          updated_at?: string | null
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
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "ADMIN" | "USER"
      currency_type: "RWF" | "USD" | "POINTS"
      payout_status: "PENDING" | "APPROVED" | "REJECTED" | "PAID"
      video_platform: "INSTAGRAM" | "FACEBOOK" | "TIKTOK"
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
      app_role: ["ADMIN", "USER"],
      currency_type: ["RWF", "USD", "POINTS"],
      payout_status: ["PENDING", "APPROVED", "REJECTED", "PAID"],
      video_platform: ["INSTAGRAM", "FACEBOOK", "TIKTOK"],
    },
  },
} as const

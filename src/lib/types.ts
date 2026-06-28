// Tipos de dominio + tipado mínimo de la base (hecho a mano).
// Si más adelante querés generarlo: `supabase gen types typescript`.

export type BlockType = "command" | "file" | "skill" | "note";
export type AppRole = "master" | "user";
export type RunStatus = "active" | "completed" | "archived";
export type Visibility = "private" | "shared";

export interface BlockMetadata {
  // command
  shell?: "bash" | "powershell" | "both";
  danger?: boolean;
  // file
  filename?: string;
  language?: string;
  // skill
  repo_url?: string;
  skill_name?: string;
  install_cmd?: string;
  // import / agentes
  tools?: string;
  model?: string;
  skills?: string;
  [key: string]: unknown;
}

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  role: AppRole;
  created_at: string;
}

export interface Block {
  id: string;
  user_id: string;
  type: BlockType;
  title: string;
  purpose: string | null;
  content: string;
  tags: string[];
  visibility: Visibility;
  metadata: BlockMetadata;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Playbook {
  id: string;
  user_id: string;
  title: string;
  purpose: string | null;
  tags: string[];
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface PlaybookStep {
  id: string;
  playbook_id: string;
  block_id: string | null;
  position: string;
  override_purpose: string | null;
  inline_type: BlockType | null;
  inline_title: string | null;
  inline_content: string | null;
}

export interface Run {
  id: string;
  playbook_id: string | null;
  user_id: string;
  title: string;
  status: RunStatus;
  share_token: string | null;
  started_at: string;
  completed_at: string | null;
}

export interface RunStep {
  id: string;
  run_id: string;
  position: number;
  type: BlockType;
  title: string;
  purpose: string | null;
  content: string;
  metadata: BlockMetadata;
  checked: boolean;
  checked_at: string | null;
}

// Paso "resuelto" para la UI del editor (junta referencia o inline + datos del bloque).
export interface ResolvedStep {
  id: string;
  position: string;
  type: BlockType;
  title: string;
  purpose: string | null;
  content: string;
  metadata: BlockMetadata;
  blockId: string | null;
}

// Forma que consume el generador de scripts.
export interface ScriptStep {
  title: string;
  purpose?: string | null;
  type: BlockType;
  content: string;
  metadata?: BlockMetadata;
}

// Tipado parcial de la base para los clientes Supabase tipados.
type Insert<T> = Partial<T>;
type Update<T> = Partial<T>;

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Insert<Profile>; Update: Update<Profile> };
      blocks: { Row: Block; Insert: Insert<Block>; Update: Update<Block> };
      playbooks: { Row: Playbook; Insert: Insert<Playbook>; Update: Update<Playbook> };
      playbook_steps: {
        Row: PlaybookStep;
        Insert: Insert<PlaybookStep>;
        Update: Update<PlaybookStep>;
      };
      runs: { Row: Run; Insert: Insert<Run>; Update: Update<Run> };
      run_steps: { Row: RunStep; Insert: Insert<RunStep>; Update: Update<RunStep> };
    };
    Views: Record<string, never>;
    Functions: {
      is_master: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      block_type: BlockType;
      app_role: AppRole;
      run_status: RunStatus;
    };
  };
}

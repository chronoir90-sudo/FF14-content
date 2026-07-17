-- Supabase の SQL Editor でこのファイルの内容をそのまま実行してください。
--
-- 現状: eorzea_pocket_data テーブルに RLS (Row Level Security) がかかっておらず、
-- 公開されている anon key だけで全ユーザーの同期データを一覧・取得できてしまう。
--
-- 対応: RLS を有効化し、ポリシーを一切追加しない。
-- これにより anon / authenticated ロール(=ブラウザからの直接アクセス)は
-- 完全に締め出され、service_role(Edge Function の内部)からのみ
-- 読み書きできるようになる。

alter table public.eorzea_pocket_data enable row level security;

-- 万が一「全員に許可」のような既存ポリシーが残っている場合に備えて削除
-- (存在しなければ何も起きないので安全に実行できる)
drop policy if exists "Allow all" on public.eorzea_pocket_data;
drop policy if exists "Enable read access for all users" on public.eorzea_pocket_data;
drop policy if exists "Enable insert for all users" on public.eorzea_pocket_data;

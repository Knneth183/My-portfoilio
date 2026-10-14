-- Safe to rerun. Allow anonymous visitors to join only the portfolio-viewers
-- channel and exchange presence events.
drop policy if exists "Visitors can see portfolio viewer presence"
on realtime.messages;

drop policy if exists "Visitors can publish portfolio viewer presence"
on realtime.messages;

create policy "Visitors can see portfolio viewer presence"
on realtime.messages
for select
to anon
using (
  extension = 'presence'
  and (select realtime.topic()) = 'portfolio-viewers'
);

create policy "Visitors can publish portfolio viewer presence"
on realtime.messages
for insert
to anon
with check (
  extension = 'presence'
  and (select realtime.topic()) = 'portfolio-viewers'
);

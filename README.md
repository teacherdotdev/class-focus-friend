# On-task Otter

On-task Otter is a shared classroom focus tool that helps students build stamina for staying on task. It gives a whole class a friendly, visual reason to focus during independent work, while giving teachers a simple timer and noise meter to support classroom routines.

The class looks after an otter that cheers them on while they work. It is an original classroom tool, not affiliated with any other focus app, and it is designed for use on a classroom display, such as a projector or TV.

## The Classroom Need

During activities such as an independent math warm-up, students may struggle to stay quiet and focused for the full work period. A regular timer can show how much time is left, but it does not always give students a reason to keep going.

On-task Otter turns a focus session into a shared goal. When the class completes a session, their character earns points that can be used to unlock clothes and accessories. The noise meter also helps the class notice whether the room matches the kind of work they are doing.

## Who It Helps

- **Students:** Build focus stamina and tolerance for working independently for five, ten, or more minutes.
- **Teachers:** Use a motivating whole-class routine and a visible noise meter for classroom management.
- **Substitute teachers:** Start a familiar focus routine without relying on one teacher's personal device.

## MVP: The First Version

The first version keeps the experience simple and useful for one classroom. It saves classroom progress on the current device, with an optional teacher account for carrying that progress between computers. Students never sign in.

- A shared focus-session timer where the teacher can enter a session length in minutes, save a named setup as a favorite, and return to favorites for future sessions.
- A classroom character that earns points when a focus session is completed.
- A point shop where the character can get clothes and accessories.
- A noise meter with adjustable sensitivity for the selected type of work:
  - Independent or silent work
  - Partner work
- When the room becomes too loud, the timer pauses automatically. It resumes when the room is back on track, and the teacher can still pause or reset the session manually.
- A history of previous focus sessions.
- A display designed to be shared with the whole class.

## A Typical Session

1. The teacher selects the type of work and enters a focus-session length, or chooses a saved favorite.
2. The class watches the timer and noise meter while they work. If the room becomes too loud, the timer pauses until the sound level returns to the goal.
3. When the session is completed, the class earns points for its character.
4. The class can use earned points to personalize the character over time.

## Teacher Accounts

On-task Otter works with no account at all: everything a class earns stays on the
computer it was earned on. A teacher who wants their classroom to follow them can
make an account with an email and password. From then on the class points, the
timer settings, the reward shop, and the otter's house save themselves
as they change, and come back by signing in on any computer.

Signing in loads the classroom saved to that account, replacing whatever is on the
screen. Signing out leaves the classroom on that computer untouched.

## Later Ideas

These are valuable possibilities, but are not needed for the first version:

- Support for multiple class sections.
- Easy display options for a TV or Roku through HDMI or AirPlay.
- A choice to use silence or calming background audio.

## Project Principles

- Keep the classroom experience quick to start and easy to understand.
- Motivate the whole class without relying on physical rewards.
- Make the noise meter useful for different learning situations, not only silent work.
- Keep the first version focused on one classroom before adding more complex options.

## Local Setup and Development

You will need [Bun](https://bun.sh/) installed on your computer.

1. In this project folder, install the project tools:

   ```bash
   bun install
   ```

2. Start the app for local development:

   ```bash
   bun run dev
   ```

3. Start the accounts database in a second terminal:

   ```bash
   bun run db
   ```

   The first time on a new computer, run `bun run db:install` once to download it.

4. Open the local address shown in your terminal to view the app.

Copy `.env.example` to `.env.local` if you need to point the app at a database
somewhere other than the one running alongside it.

### Reviewing teacher accounts

The database comes with its own admin page, reachable at `/_/` on the same
address as the app. Sign in there to see the list of teacher accounts and the
classroom saved with each one.

To create a production build, run:

```bash
bun run build
```

## About, Privacy, and the Footer

Every screen carries a footer crediting the
[EdTech-a-thon](https://edtechathon.com) and linking to two shared pages:
`/about`, which introduces the people behind the project, and `/privacy`, which
explains what the app stores and what it never collects. Both are reached
through `src/hooks/useRoute.js`, a small address watcher that keeps the site a
single page. Teachers who write in are answered at support@teacher.dev.

## Publishing the Website

The website is published on Vercel, and `vercel.json` describes how addresses on
it are answered:

- Vercel builds the site with `bun run build` and serves the finished `dist`
  folder.
- The whole site is one page that swaps between the classroom, `/about`, and
  `/privacy` as you move around it, so every address that is not a real file
  loads that page. A teacher can refresh, bookmark, or share any of those links
  and still land on a working app instead of a "not found" screen.
- Addresses starting with `/api` and `/_` are left out of that rule, because they
  belong to PocketBase. Without this, a sign-in request would be answered with
  the page itself, and the app would report a confusing error instead of a clear
  one.
- Each build names its files after their contents, so browsers keep them for a
  year, while the page itself is checked on every visit. A classroom always opens
  the newest version without a hard refresh.

### Teacher accounts on the published site

Vercel hosts the website only. PocketBase keeps its records in a file and needs
to stay running, so it lives on its own always-on computer rather than on Vercel.
Until it has one, the published site works fully on its own, saving each
classroom on the computer it is used on, and only the optional teacher accounts
are unavailable.

Once PocketBase is running somewhere with its own web address, add a
`VITE_POCKETBASE_URL` environment variable in the Vercel project settings, set it
to that address, and redeploy. Nothing in `vercel.json` needs to change.

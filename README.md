# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bf5d767a-3821-415a-bbf4-40a4485a54c8

## Games Available

### Cannabis Wordle

A cannabis-themed version of the popular word game Wordle. Try to guess the 5-letter word related to cannabis culture in 6 attempts or less!

**How to Play:**
1. Type a 5-letter word and press Enter
2. The colors will give you hints:
   - Green: Letter is correct and in the right position
   - Yellow: Letter is in the word but in the wrong position
   - Gray: Letter is not in the word
3. Use the hint button if you need help
4. Try to maintain your daily streak!

**Features:**
- Daily challenges
- Streak tracking
- Helpful hints
- Mobile-friendly keyboard

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bf5d767a-3821-415a-bbf4-40a4485a54c8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You have two options for deployment:

### Option 1: Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/bf5d767a-3821-415a-bbf4-40a4485a54c8) and click on Share -> Publish.

### Option 2: Deploy with Netlify (Recommended for custom domains)

1. **Connect your repository to Netlify**:
   - Go to [Netlify](https://www.netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Use these build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18` or higher

2. **Configure environment variables**:
   - Go to Site settings > Build & deploy > Environment
   - Add your environment variables from your `.env` file

3. **Add your custom domain**:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Follow Netlify's instructions to configure your domain's DNS settings

4. **Enable HTTPS**:
   - Netlify will automatically provision an SSL certificate
   - This might take a few minutes to complete

For more detailed instructions, visit [Netlify's documentation](https://docs.netlify.com/domains-https/custom-domains/).

## Need help with deployment?

If you need assistance with deployment or custom domain setup, check out these resources:
- [Netlify Deployment Documentation](https://docs.netlify.com/site-deploys/create-deploys/)
- [Custom Domain Configuration Guide](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/)
- [Troubleshooting Guide](https://docs.netlify.com/troubleshooting/common-issues/)

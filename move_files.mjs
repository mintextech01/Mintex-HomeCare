import fs from 'fs';
import path from 'path';

const moveFile = (src, dest) => {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
    console.log(`Moved ${src} to ${dest}`);
  }
};

moveFile('src/admin-main.tsx', 'src/admin/admin-main.tsx');
moveFile('src/AdminApp.tsx', 'src/admin/AdminApp.tsx');
moveFile('src/pages/AdminDashboard.tsx', 'src/admin/pages/AdminDashboard.tsx');
moveFile('src/pages/AdminLogin.tsx', 'src/admin/pages/AdminLogin.tsx');

moveFile('src/main.tsx', 'src/user/main.tsx');
moveFile('src/App.tsx', 'src/user/App.tsx');
moveFile('src/pages/Index.tsx', 'src/user/pages/Index.tsx');
moveFile('src/pages/About.tsx', 'src/user/pages/About.tsx');
moveFile('src/pages/Careers.tsx', 'src/user/pages/Careers.tsx');
moveFile('src/pages/Contact.tsx', 'src/user/pages/Contact.tsx');
moveFile('src/pages/Services.tsx', 'src/user/pages/Services.tsx');
moveFile('src/pages/NotFound.tsx', 'src/user/pages/NotFound.tsx');

// Try to remove src/pages if empty
try {
  fs.rmdirSync('src/pages');
  console.log('Removed empty src/pages directory');
} catch (e) {
  console.log('Could not remove src/pages (might not be empty or already gone)');
}

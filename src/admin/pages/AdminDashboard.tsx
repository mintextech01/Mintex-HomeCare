import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin, type JobPosition, type ServiceItem, type ContactInfo } from "@/contexts/AdminContext";
import { type SiteImages, type SiteImageKey, type SiteImageGroup, SITE_IMAGE_GROUPS } from "@/config/siteImageConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, MessageSquare, Users, Image, Settings, LogOut, Mail, Star, Trash2, Edit, Plus, Eye, EyeOff, Menu, Briefcase, Phone, MapPin, Layers, Upload, ClipboardList, Download, FileText as FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { iconNames } from "@/lib/iconMap";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type Tab = "dashboard" | "testimonials" | "team" | "gallery" | "site-images" | "services" | "submissions" | "applications" | "positions" | "contact-info";

const AdminDashboard = () => {
  const { isAuthenticated, logout, isLoading, testimonials, setTestimonials, teamMembers, setTeamMembers, gallery, setGallery, services, setServices, submissions, setSubmissions, updateSubmission, deleteSubmission, jobPositions, setJobPositions, contactInfo, setContactInfo, siteImages, setSiteImages } = useAdmin();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-hero-bg">
      <div className="text-center space-y-3">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground font-sans text-sm">Loading admin panel…</p>
      </div>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/" replace />;

  const tabs = [
    { key: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { key: "testimonials" as Tab, label: "Testimonials", icon: MessageSquare },
    { key: "team" as Tab, label: "Team Members", icon: Users },
    { key: "gallery" as Tab, label: "Gallery", icon: Image },
    { key: "site-images" as Tab, label: "Site Images", icon: Layers },
    { key: "services" as Tab, label: "Services", icon: Settings },
    { key: "positions" as Tab, label: "Job Positions", icon: Briefcase },
    { key: "contact-info" as Tab, label: "Contact Info", icon: Phone },
    { key: "submissions" as Tab, label: "Submissions", icon: Mail },
    { key: "applications" as Tab, label: "Applications", icon: ClipboardList },
  ];

  const selectTab = (t: Tab) => { setTab(t); setSidebarOpen(false); };

  return (
    <div className="min-h-screen flex bg-hero-bg">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-40 w-64 bg-card border-r border-border transition-transform duration-300 flex-shrink-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-border">
          <div className="text-xl font-serif font-bold text-primary">Mintex<span className="text-accent">Care</span></div>
          <p className="text-xs text-muted-foreground font-sans">Admin Panel</p>
        </div>
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => selectTab(t.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>
              <t.icon className="h-4 w-4 shrink-0" /> {t.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-muted-foreground hover:text-foreground" aria-label="Toggle sidebar"><Menu className="h-5 w-5" /></button>
          <span className="text-sm text-muted-foreground font-sans hidden sm:block">Welcome, Admin</span>
          <span className="text-sm text-muted-foreground font-sans lg:hidden">{tabs.find(t => t.key === tab)?.label}</span>
          <Button variant="ghost" size="sm" onClick={logout} className="hidden lg:flex font-sans text-muted-foreground"><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {tab === "dashboard" && <DashboardTab submissions={submissions} teamMembers={teamMembers} testimonials={testimonials} jobPositions={jobPositions} />}
          {tab === "testimonials" && <TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} toast={toast} />}
          {tab === "team" && <TeamTab teamMembers={teamMembers} setTeamMembers={setTeamMembers} toast={toast} />}
          {tab === "gallery" && <GalleryTab gallery={gallery} setGallery={setGallery} toast={toast} />}
          {tab === "site-images" && <SiteImagesTab siteImages={siteImages} setSiteImages={setSiteImages} teamMembers={teamMembers} setTeamMembers={setTeamMembers} toast={toast} />}
          {tab === "services" && <ServicesTab services={services} setServices={setServices} toast={toast} />}
          {tab === "positions" && <PositionsTab positions={jobPositions} setPositions={setJobPositions} toast={toast} />}
          {tab === "contact-info" && <ContactInfoTab contactInfo={contactInfo} setContactInfo={setContactInfo} toast={toast} />}
          {tab === "submissions" && <SubmissionsTab submissions={submissions} setSubmissions={setSubmissions} updateSubmission={updateSubmission} />}
          {tab === "applications" && <ApplicationsTab submissions={submissions} updateSubmission={updateSubmission} deleteSubmission={deleteSubmission} toast={toast} />}
        </main>
      </div>
    </div>
  );
};

/* ── Dashboard ── */
const DashboardTab = ({ submissions, teamMembers, testimonials, jobPositions }: any) => (
  <div>
    <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Dashboard</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-sans text-muted-foreground">Submissions</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary font-sans">{submissions.length}</p></CardContent></Card>
      <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-sans text-muted-foreground">Team</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary font-sans">{teamMembers.length}</p></CardContent></Card>
      <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-sans text-muted-foreground">Testimonials</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary font-sans">{testimonials.length}</p></CardContent></Card>
      <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-sans text-muted-foreground">Open Positions</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary font-sans">{jobPositions?.filter((p: any) => p.active).length || 0}</p></CardContent></Card>
    </div>
    <Card className="shadow-sm">
      <CardHeader><CardTitle className="text-lg font-serif">Recent Submissions</CardTitle></CardHeader>
      <CardContent>
        {submissions.length === 0 ? <p className="text-muted-foreground font-sans text-sm">No submissions yet.</p> : (
          <div className="space-y-3">
            {submissions.slice(0, 5).map((s: any) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-hero-bg rounded-lg">
                <div><p className="font-sans font-medium text-sm text-foreground">{s.name}</p><p className="font-sans text-xs text-muted-foreground">{s.email} • {new Date(s.date).toLocaleDateString()}</p></div>
                {!s.read && <span className="h-2 w-2 rounded-full bg-accent shrink-0" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

/* ── Testimonials ── */
const TestimonialsTab = ({ testimonials, setTestimonials, toast }: any) => {
  const [form, setForm] = useState({ name: "", text: "", rating: "5", location: "" });
  const [editing, setEditing] = useState<string | null>(null);
  const save = () => {
    if (!form.name || !form.text) return;
    if (editing) {
      setTestimonials((prev: any[]) => prev.map((t: any) => t.id === editing ? { ...t, ...form, rating: parseInt(form.rating) } : t));
      setEditing(null); toast({ title: "Updated" });
    } else {
      setTestimonials((prev: any[]) => [...prev, { id: Date.now().toString(), ...form, rating: parseInt(form.rating) }]);
      toast({ title: "Added" });
    }
    setForm({ name: "", text: "", rating: "5", location: "" });
  };
  const startEdit = (t: any) => { setEditing(t.id); setForm({ name: t.name, text: t.text, rating: t.rating.toString(), location: t.location }); };
  const remove = (id: string) => { setTestimonials((prev: any[]) => prev.filter((t: any) => t.id !== id)); toast({ title: "Deleted" }); };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Testimonials</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3"><Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="font-sans" /><Input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="font-sans" /></div>
        <Textarea placeholder="Testimonial text" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className="font-sans" />
        <div className="flex flex-wrap gap-3 items-center"><Input type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="w-32 font-sans" /><Button onClick={save} className="font-sans"><Plus className="h-4 w-4 mr-1" /> {editing ? "Update" : "Add"}</Button>{editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ name: "", text: "", rating: "5", location: "" }); }} className="font-sans">Cancel</Button>}</div>
      </CardContent></Card>
      <Card className="shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead className="hidden sm:table-cell">Text</TableHead><TableHead>Rating</TableHead><TableHead className="hidden md:table-cell">Location</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>{testimonials.map((t: any) => (
          <TableRow key={t.id}><TableCell className="font-sans font-medium">{t.name}</TableCell><TableCell className="font-sans max-w-xs truncate hidden sm:table-cell">{t.text}</TableCell><TableCell><div className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}</div></TableCell><TableCell className="font-sans hidden md:table-cell">{t.location}</TableCell><TableCell><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => startEdit(t)}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => remove(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>
        ))}</TableBody>
      </Table></div></Card>
    </div>
  );
};

/* ── Team ── */
const TeamTab = ({ teamMembers, setTeamMembers, toast }: any) => {
  const [form, setForm] = useState({ name: "", role: "", photoUrl: "", bio: "" });
  const [editing, setEditing] = useState<string | null>(null);
  const save = () => {
    if (!form.name || !form.role) return;
    if (editing) { setTeamMembers((prev: any[]) => prev.map((m: any) => m.id === editing ? { ...m, ...form } : m)); setEditing(null); toast({ title: "Updated" }); }
    else { setTeamMembers((prev: any[]) => [...prev, { id: Date.now().toString(), ...form }]); toast({ title: "Added" }); }
    setForm({ name: "", role: "", photoUrl: "", bio: "" });
  };
  const startEdit = (m: any) => { setEditing(m.id); setForm({ name: m.name, role: m.role, photoUrl: m.photoUrl, bio: m.bio }); };
  const remove = (id: string) => { setTeamMembers((prev: any[]) => prev.filter((m: any) => m.id !== id)); toast({ title: "Removed" }); };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Team Members</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3"><Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="font-sans" /><Input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="font-sans" /></div>
        <Input placeholder="Photo URL" value={form.photoUrl} onChange={e => setForm({ ...form, photoUrl: e.target.value })} className="font-sans" />
        <Textarea placeholder="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="font-sans" />
        <div className="flex flex-wrap gap-3"><Button onClick={save} className="font-sans"><Plus className="h-4 w-4 mr-1" /> {editing ? "Update" : "Add"}</Button>{editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ name: "", role: "", photoUrl: "", bio: "" }); }} className="font-sans">Cancel</Button>}</div>
      </CardContent></Card>
      <Card className="shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Photo</TableHead><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>{teamMembers.map((m: any) => (
          <TableRow key={m.id}><TableCell>{m.photoUrl && <img src={m.photoUrl} alt={m.name} className="h-10 w-10 rounded-full object-cover" />}</TableCell><TableCell className="font-sans font-medium">{m.name}</TableCell><TableCell className="font-sans">{m.role}</TableCell><TableCell><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => startEdit(m)}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>
        ))}</TableBody>
      </Table></div></Card>
    </div>
  );
};

/* ── Gallery ── */
const GalleryTab = ({ gallery, setGallery, toast }: any) => {
  const [url, setUrl] = useState(""); const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const add = () => { if (!url) return; setGallery((prev: any[]) => [...prev, { id: Date.now().toString(), url, caption }]); setUrl(""); setCaption(""); toast({ title: "Added" }); };
  const remove = (id: string) => { setGallery((prev: any[]) => prev.filter((g: any) => g.id !== id)); toast({ title: "Removed" }); };
  const handleGalleryFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await uploadImage(file);
      setGallery((prev: any[]) => [...prev, { id: Date.now().toString(), url: dataUrl, caption }]);
      setCaption(""); toast({ title: "Image uploaded and added" });
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
    finally { setUploading(false); if (galleryFileRef.current) galleryFileRef.current.value = ""; }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Gallery</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <Input placeholder="Image URL (or upload below)" value={url} onChange={e => setUrl(e.target.value)} className="font-sans" />
        <Input placeholder="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} className="font-sans" />
        <div className="flex flex-wrap gap-2">
          <Button onClick={add} className="font-sans"><Plus className="h-4 w-4 mr-1" /> Add by URL</Button>
          <label className={`flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background font-sans text-sm cursor-pointer hover:bg-accent/10 transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            <Upload className="h-4 w-4" /> {uploading ? "Processing…" : "Upload from PC"}
            <input ref={galleryFileRef} type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleGalleryFile} />
          </label>
        </div>
      </CardContent></Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((g: any) => (
          <div key={g.id} className="relative group rounded-xl overflow-hidden border border-border shadow-sm">
            <img src={g.url} alt={g.caption} className="w-full h-48 object-cover" loading="lazy" />
            {g.caption && <p className="p-3 text-sm text-muted-foreground font-sans">{g.caption}</p>}
            <button onClick={() => remove(g.id)} className="absolute top-2 right-2 h-8 w-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {gallery.length === 0 && <p className="text-muted-foreground font-sans col-span-full text-center py-12">No images yet.</p>}
      </div>
    </div>
  );
};

/* ── Services (full CRUD) ── */
const ServicesTab = ({ services, setServices, toast }: { services: ServiceItem[]; setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>; toast: any }) => {
  const [form, setForm] = useState({ title: "", description: "", icon: "Heart", category: "home" as "home" | "nursing" });
  const [editing, setEditing] = useState<string | null>(null);

  const save = () => {
    if (!form.title || !form.description) return;
    if (editing) {
      setServices(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s));
      setEditing(null); toast({ title: "Service updated" });
    } else {
      setServices(prev => [...prev, { id: Date.now().toString(), ...form }]);
      toast({ title: "Service added" });
    }
    setForm({ title: "", description: "", icon: "Heart", category: "home" });
  };

  const startEdit = (s: ServiceItem) => { setEditing(s.id); setForm({ title: s.title, description: s.description, icon: s.icon, category: s.category }); };
  const remove = (id: string) => { setServices(prev => prev.filter(s => s.id !== id)); toast({ title: "Service removed" }); };

  const homeServices = services.filter(s => s.category === "home");
  const nursingServices = services.filter(s => s.category === "nursing");

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Services Management</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Service Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="font-sans" />
          <Select value={form.category} onValueChange={v => setForm({ ...form, category: v as "home" | "nursing" })}>
            <SelectTrigger className="font-sans"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home Care</SelectItem>
              <SelectItem value="nursing">Nursing Facility</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder="Service Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="font-sans" />
        <Select value={form.icon} onValueChange={v => setForm({ ...form, icon: v })}>
          <SelectTrigger className="font-sans w-48"><SelectValue /></SelectTrigger>
          <SelectContent>{iconNames.map(name => <SelectItem key={name} value={name} className="font-sans">{name}</SelectItem>)}</SelectContent>
        </Select>
        <div className="flex flex-wrap gap-3">
          <Button onClick={save} className="font-sans"><Plus className="h-4 w-4 mr-1" /> {editing ? "Update" : "Add"} Service</Button>
          {editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", description: "", icon: "Heart", category: "home" }); }} className="font-sans">Cancel</Button>}
        </div>
      </CardContent></Card>

      <h2 className="text-lg font-serif font-semibold text-foreground mb-3">Home Care Services ({homeServices.length})</h2>
      <Card className="shadow-sm overflow-hidden mb-6"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Icon</TableHead><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Description</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>{homeServices.map(s => (
          <TableRow key={s.id}><TableCell className="font-sans text-xs text-muted-foreground">{s.icon}</TableCell><TableCell className="font-sans font-medium">{s.title}</TableCell><TableCell className="font-sans text-sm max-w-xs truncate hidden md:table-cell">{s.description}</TableCell><TableCell><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => startEdit(s)}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>
        ))}</TableBody>
      </Table></div></Card>

      <h2 className="text-lg font-serif font-semibold text-foreground mb-3">Nursing Facility Services ({nursingServices.length})</h2>
      <Card className="shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Icon</TableHead><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Description</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>{nursingServices.map(s => (
          <TableRow key={s.id}><TableCell className="font-sans text-xs text-muted-foreground">{s.icon}</TableCell><TableCell className="font-sans font-medium">{s.title}</TableCell><TableCell className="font-sans text-sm max-w-xs truncate hidden md:table-cell">{s.description}</TableCell><TableCell><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => startEdit(s)}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell></TableRow>
        ))}</TableBody>
      </Table></div></Card>
    </div>
  );
};

/* ── Job Positions ── */
const PositionsTab = ({ positions, setPositions, toast }: { positions: JobPosition[]; setPositions: React.Dispatch<React.SetStateAction<JobPosition[]>>; toast: any }) => {
  const [form, setForm] = useState({ title: "", type: "", description: "", requirements: "" });
  const [editing, setEditing] = useState<string | null>(null);

  const save = () => {
    if (!form.title || !form.type) return;
    if (editing) {
      setPositions(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p));
      setEditing(null); toast({ title: "Position updated" });
    } else {
      setPositions(prev => [...prev, { id: Date.now().toString(), ...form, active: true }]);
      toast({ title: "Position added" });
    }
    setForm({ title: "", type: "", description: "", requirements: "" });
  };

  const startEdit = (p: JobPosition) => { setEditing(p.id); setForm({ title: p.title, type: p.type, description: p.description, requirements: p.requirements }); };
  const remove = (id: string) => { setPositions(prev => prev.filter(p => p.id !== id)); toast({ title: "Position removed" }); };
  const toggleActive = (id: string) => { setPositions(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p)); };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Job Positions</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Position Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="font-sans" />
          <Input placeholder="Type (e.g. Full-time)" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="font-sans" />
        </div>
        <Textarea placeholder="Full Job Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="font-sans" />
        <Textarea placeholder="Requirements (one per line or comma-separated)" value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={3} className="font-sans" />
        <div className="flex flex-wrap gap-3">
          <Button onClick={save} className="font-sans"><Plus className="h-4 w-4 mr-1" /> {editing ? "Update" : "Add"} Position</Button>
          {editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", type: "", description: "", requirements: "" }); }} className="font-sans">Cancel</Button>}
        </div>
      </CardContent></Card>
      <Card className="shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead className="hidden md:table-cell">Description</TableHead><TableHead>Active</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>{positions.map(p => (
          <TableRow key={p.id} className={!p.active ? "opacity-50" : ""}>
            <TableCell className="font-sans font-medium">{p.title}</TableCell>
            <TableCell className="font-sans text-sm">{p.type}</TableCell>
            <TableCell className="font-sans text-sm max-w-xs truncate hidden md:table-cell">{p.description}</TableCell>
            <TableCell><Switch checked={p.active} onCheckedChange={() => toggleActive(p.id)} /></TableCell>
            <TableCell><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => startEdit(p)}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></div></Card>
    </div>
  );
};

/* ── Contact Info ── */
const ContactInfoTab = ({ contactInfo, setContactInfo, toast }: { contactInfo: ContactInfo; setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>; toast: any }) => {
  const [form, setForm] = useState<ContactInfo>(contactInfo);

  const save = () => {
    setContactInfo(form);
    toast({ title: "Contact info updated" });
  };

  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent(form.address)}`;

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Information</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-sm"><CardContent className="pt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Phone Number</label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="font-sans" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Fax</label>
            <Input value={form.fax} onChange={e => setForm({ ...form, fax: e.target.value })} className="font-sans" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Email</label>
            <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="font-sans" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Address</label>
            <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="font-sans" placeholder="e.g. 123 Main St, Edison, NJ 08817" />
            <p className="text-xs text-muted-foreground mt-1">Map will update automatically based on this address</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Business Hours</label>
            <Input value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} className="font-sans" />
          </div>
          <Button onClick={save} className="font-sans w-full">Save Changes</Button>
        </CardContent></Card>

        <Card className="shadow-sm"><CardContent className="pt-6 space-y-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Section Content</h3>
          <p className="text-xs text-muted-foreground mb-3">Edit the heading, description and social links shown in the "Get In Touch" section.</p>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Eyebrow Text</label>
            <Input value={form.sectionEyebrow ?? ""} onChange={e => setForm({ ...form, sectionEyebrow: e.target.value })} className="font-sans" placeholder="Get In Touch" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Section Heading</label>
            <Input value={form.sectionHeading ?? ""} onChange={e => setForm({ ...form, sectionHeading: e.target.value })} className="font-sans" placeholder="Ready to Get Started?" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Section Description</label>
            <Textarea value={form.sectionDescription ?? ""} onChange={e => setForm({ ...form, sectionDescription: e.target.value })} className="font-sans" rows={3} placeholder="Contact us today for a free, no-obligation consultation..." />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Facebook URL</label>
            <Input value={form.facebookUrl ?? ""} onChange={e => setForm({ ...form, facebookUrl: e.target.value })} className="font-sans" placeholder="https://facebook.com/mintexcare" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">Instagram URL</label>
            <Input value={form.instagramUrl ?? ""} onChange={e => setForm({ ...form, instagramUrl: e.target.value })} className="font-sans" placeholder="https://instagram.com/mintexcare" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground font-sans block mb-1">LinkedIn URL</label>
            <Input value={form.linkedinUrl ?? ""} onChange={e => setForm({ ...form, linkedinUrl: e.target.value })} className="font-sans" placeholder="https://linkedin.com/company/mintexcare" />
          </div>
          <Button onClick={save} className="font-sans w-full">Save Changes</Button>
        </CardContent></Card>

        <Card className="shadow-sm"><CardContent className="pt-6">
          <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Map Preview</h3>
          <div className="rounded-lg overflow-hidden border border-border h-[300px]">
            <iframe title="Location Preview" src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground font-sans">
            <p><strong className="text-foreground">Phone:</strong> {form.phone}</p>
            <p><strong className="text-foreground">Fax:</strong> {form.fax}</p>
            <p><strong className="text-foreground">Email:</strong> {form.email}</p>
            <p><strong className="text-foreground">Address:</strong> {form.address}</p>
            <p><strong className="text-foreground">Hours:</strong> {form.hours}</p>
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
};

/* ── Submissions ── */
const SubmissionsTab = ({ submissions, setSubmissions, updateSubmission }: any) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState<"all" | "contact" | "career">("all");
  const [resumeData, setResumeData] = useState<{ data: string; name: string } | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);

  useEffect(() => {
    setResumeData(null);
    if (!selected?.resumeName) return;
    setResumeLoading(true);
    (async () => {
      try {
        const metaSnap = await getDoc(doc(db, "resumeData", selected.id));
        if (!metaSnap.exists()) return;
        const { name, totalChunks } = metaSnap.data();
        const chunkSnaps = await Promise.all(
          Array.from({ length: totalChunks }, (_, i) =>
            getDoc(doc(db, "resumeChunks", `${selected.id}_${i}`))
          )
        );
        const fullData = chunkSnaps.map(s => s.data()?.data ?? "").join("");
        setResumeData({ data: fullData, name });
      } catch { /* show nothing */ }
      finally { setResumeLoading(false); }
    })();
  }, [selected?.id]);

  const toggleRead = (id: string, currentRead: boolean) => {
    updateSubmission(id, { read: !currentRead });
    if (selected?.id === id) setSelected((prev: any) => prev ? { ...prev, read: !prev.read } : prev);
  };

  const filtered = submissions.filter((s: any) =>
    filter === "all" ? true : (s.type ?? "contact") === filter
  );

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Submissions</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["all", "contact", "career"] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setSelected(null); }}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {f === "all" ? `All (${submissions.length})` : f === "career" ? `Applications (${submissions.filter((s: any) => (s.type ?? "contact") === "career").length})` : `Contact (${submissions.filter((s: any) => (s.type ?? "contact") === "contact").length})`}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? "lg:grid-cols-[1fr_380px]" : ""}`}>
        {/* List */}
        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Position / Service</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground font-sans py-12">No submissions yet</TableCell></TableRow>
                )}
                {filtered.map((s: any) => {
                  const isCareer = (s.type ?? "contact") === "career";
                  return (
                    <TableRow
                      key={s.id}
                      className={`cursor-pointer transition-colors ${s.read ? "opacity-60" : ""} ${selected?.id === s.id ? "bg-primary/5" : "hover:bg-muted/40"}`}
                      onClick={() => setSelected(s)}
                    >
                      <TableCell>{s.read ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-accent" />}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${isCareer ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                          {isCareer ? "Application" : "Contact"}
                        </span>
                      </TableCell>
                      <TableCell className="font-sans font-medium">{s.name}</TableCell>
                      <TableCell className="font-sans text-sm hidden sm:table-cell">{s.email}</TableCell>
                      <TableCell className="font-sans text-sm hidden md:table-cell">{s.position || s.service || "—"}</TableCell>
                      <TableCell className="font-sans text-sm hidden sm:table-cell">{new Date(s.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); toggleRead(s.id, s.read); }} className="font-sans text-xs">
                          {s.read ? "Unread" : "Read"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Detail panel */}
        {selected && (
          <Card className="shadow-sm h-fit sticky top-20">
            <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
              <div>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans mb-2 ${(selected.type ?? "contact") === "career" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                  {(selected.type ?? "contact") === "career" ? "Job Application" : "Contact Message"}
                </div>
                <CardTitle className="text-base font-serif">{selected.name}</CardTitle>
                <p className="text-xs text-muted-foreground font-sans mt-0.5">{new Date(selected.date).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-lg leading-none shrink-0">✕</button>
            </CardHeader>
            <CardContent className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline break-all">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-foreground hover:underline">{selected.phone}</a>
                  </div>
                )}
              </div>

              {(selected.position || selected.service) && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                    {(selected.type ?? "contact") === "career" ? "Position Applied For" : "Service"}
                  </p>
                  <p className="text-foreground font-medium">{selected.position || selected.service}</p>
                </div>
              )}

              {(selected.type ?? "contact") === "career" && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Resume / Document</p>
                  {resumeLoading ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
                      <div className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Loading resume…
                    </div>
                  ) : resumeData ? (
                    <>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border mb-2">
                        <FileIcon className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-xs font-sans text-foreground truncate flex-1">{resumeData.name || selected.resumeName || "Resume"}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewResume(resumeData.data)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors text-xs font-semibold"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                        <button
                          onClick={() => downloadFile(resumeData.data, resumeData.name || selected.resumeName || "resume")}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-colors text-xs font-semibold"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground font-sans italic">No resume uploaded</p>
                  )}
                </div>
              )}

              {(selected.coverLetter || selected.message) && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    {(selected.type ?? "contact") === "career" ? "Cover Letter" : "Message"}
                  </p>
                  <p className="text-foreground whitespace-pre-wrap bg-muted/40 rounded-lg p-3 text-xs leading-relaxed">
                    {selected.coverLetter || selected.message || "—"}
                  </p>
                </div>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleRead(selected.id, selected.read)}
                className="w-full font-sans text-xs"
              >
                {selected.read ? <><Eye className="h-3.5 w-3.5 mr-1.5" /> Mark as Unread</> : <><EyeOff className="h-3.5 w-3.5 mr-1.5" /> Mark as Read</>}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};


/* ── Resume helpers (works with base64 data URLs stored in Firestore) ── */
const dataUrlToBlob = (dataUrl: string): Blob => {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "application/octet-stream";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
};

const viewResume = (url: string) => {
  const blob = url.startsWith("data:") ? dataUrlToBlob(url) : null;
  const objectUrl = blob ? URL.createObjectURL(blob) : url;
  window.open(objectUrl, "_blank");
};

const downloadFile = (url: string, fileName: string) => {
  const blob = url.startsWith("data:") ? dataUrlToBlob(url) : null;
  const objectUrl = blob ? URL.createObjectURL(blob) : url;
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName || "resume";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (blob) URL.revokeObjectURL(objectUrl);
};

/* ── Applications ── */
const ApplicationsTab = ({ submissions, updateSubmission, deleteSubmission, toast }: any) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<{ data: string; name: string } | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);

  // Fetch resume chunks from Firestore whenever selection changes
  useEffect(() => {
    setResumeData(null);
    if (!selected?.resumeName) return;
    setResumeLoading(true);
    (async () => {
      try {
        const metaSnap = await getDoc(doc(db, "resumeData", selected.id));
        if (!metaSnap.exists()) return;
        const { name, totalChunks } = metaSnap.data();
        const chunkSnaps = await Promise.all(
          Array.from({ length: totalChunks }, (_, i) =>
            getDoc(doc(db, "resumeChunks", `${selected.id}_${i}`))
          )
        );
        const fullData = chunkSnaps.map(s => s.data()?.data ?? "").join("");
        setResumeData({ data: fullData, name });
      } catch { /* show nothing */ }
      finally { setResumeLoading(false); }
    })();
  }, [selected?.id]);

  const applications = submissions.filter((s: any) => s.type === "career");

  const filtered = statusFilter === "all"
    ? applications
    : applications.filter((s: any) => (s.status || "new") === statusFilter);

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    reviewed: "bg-yellow-100 text-yellow-700",
    interview: "bg-purple-100 text-purple-700",
    hired: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<string, string> = {
    new: "New",
    reviewed: "Reviewed",
    interview: "Interview",
    hired: "Hired",
    rejected: "Rejected",
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateSubmission(id, { status, read: true });
    if (selected?.id === id) setSelected((prev: any) => prev ? { ...prev, status, read: true } : prev);
    toast({ title: "Status updated" });
  };

  const handleDelete = async (id: string) => {
    await deleteSubmission(id);
    if (selected?.id === id) setSelected(null);
    setConfirmDelete(null);
    toast({ title: "Application deleted" });
  };

  const toggleRead = (id: string, currentRead: boolean) => {
    updateSubmission(id, { read: !currentRead });
    if (selected?.id === id) setSelected((prev: any) => prev ? { ...prev, read: !prev.read } : prev);
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Job Applications</h1>
      <p className="text-sm text-muted-foreground font-sans mb-6">{applications.length} total application{applications.length !== 1 ? "s" : ""} received</p>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "new", "reviewed", "interview", "hired", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setStatusFilter(f); setSelected(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold capitalize transition-colors ${statusFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {f === "all" ? `All (${applications.length})` : `${statusLabels[f]} (${applications.filter((s: any) => (s.status || "new") === f).length})`}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? "lg:grid-cols-[1fr_400px]" : ""}`}>
        {/* List */}
        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead className="hidden sm:table-cell">Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Resume</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground font-sans py-12">No applications found</TableCell></TableRow>
                )}
                {filtered.map((s: any) => (
                  <TableRow
                    key={s.id}
                    className={`cursor-pointer transition-colors ${s.read ? "opacity-70" : "font-medium"} ${selected?.id === s.id ? "bg-primary/5" : "hover:bg-muted/40"}`}
                    onClick={() => { setSelected(s); if (!s.read) updateSubmission(s.id, { read: true }); }}
                  >
                    <TableCell>
                      <p className="font-sans font-medium text-sm">{s.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">{s.email}</p>
                    </TableCell>
                    <TableCell className="font-sans text-sm hidden sm:table-cell">{s.position || s.service || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${statusColors[s.status || "new"]}`}>
                        {statusLabels[s.status || "new"]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {s.resumeUrl
                        ? <span className="inline-flex items-center gap-1 text-xs text-accent font-sans"><FileIcon className="h-3.5 w-3.5" /> Attached</span>
                        : <span className="text-xs text-muted-foreground font-sans">—</span>
                      }
                    </TableCell>
                    <TableCell className="font-sans text-xs text-muted-foreground hidden md:table-cell">{new Date(s.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); setConfirmDelete(s.id); }} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Detail panel */}
        {selected && (
          <Card className="shadow-sm h-fit sticky top-20">
            <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base font-serif">{selected.name}</CardTitle>
                <p className="text-xs text-muted-foreground font-sans mt-0.5">{new Date(selected.date).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-lg leading-none shrink-0">✕</button>
            </CardHeader>
            <CardContent className="space-y-4 text-sm font-sans">

              {/* Status update */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Application Status</p>
                <Select value={selected.status || "new"} onValueChange={(v) => handleStatusChange(selected.id, v)}>
                  <SelectTrigger className="font-sans h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="interview">Interview Scheduled</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline break-all text-xs">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-foreground hover:underline text-xs">{selected.phone}</a>
                  </div>
                )}
              </div>

              {/* Position */}
              {(selected.position || selected.service) && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Position Applied For</p>
                  <p className="text-foreground font-medium text-sm">{selected.position || selected.service}</p>
                </div>
              )}

              {/* Resume */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Resume / Document</p>
                {resumeLoading ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
                    <div className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading resume…
                  </div>
                ) : resumeData ? (
                  <>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border mb-2">
                      <FileIcon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-xs font-sans text-foreground truncate flex-1">{resumeData.name || selected.resumeName || "Resume"}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewResume(resumeData.data)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors text-xs font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button
                        onClick={() => downloadFile(resumeData.data, resumeData.name || selected.resumeName || "resume")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-colors text-xs font-semibold"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>
                  </>
                ) : selected.resumeName ? (
                  <p className="text-xs text-muted-foreground font-sans italic">Resume attached but could not be loaded.</p>
                ) : (
                  <p className="text-xs text-muted-foreground font-sans italic">No resume uploaded</p>
                )}
              </div>

              {/* Cover letter */}
              {(selected.coverLetter || selected.message) && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Cover Letter</p>
                  <p className="text-foreground whitespace-pre-wrap bg-muted/40 rounded-lg p-3 text-xs leading-relaxed max-h-44 overflow-y-auto">
                    {selected.coverLetter || selected.message || "—"}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleRead(selected.id, selected.read)}
                  className="flex-1 font-sans text-xs"
                >
                  {selected.read ? <><Eye className="h-3.5 w-3.5 mr-1.5" /> Mark Unread</> : <><EyeOff className="h-3.5 w-3.5 mr-1.5" /> Mark Read</>}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setConfirmDelete(selected.id)}
                  className="font-sans text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm shadow-2xl">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-serif font-bold text-foreground">Delete Application?</h3>
              <p className="text-sm text-muted-foreground font-sans">This will permanently delete this application. This cannot be undone.</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setConfirmDelete(null)} className="flex-1 font-sans">Cancel</Button>
                <Button variant="destructive" onClick={() => handleDelete(confirmDelete)} className="flex-1 font-sans">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};


/* ── Image upload utility ── */

/** Compress a raster image on the client, return as a Blob */
const compressImage = (file: File, maxWidth = 1400, quality = 0.85): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error("Canvas toBlob failed")),
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Failed to load image")); };
    img.src = objectUrl;
  });

/**
 * Compress an image and return it as a base64 data URL.
 * Stored directly in Firestore — no Firebase Storage required.
 */
const uploadImage = async (file: File): Promise<string> => {
  if (file.type === "image/svg+xml") {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const blob = await compressImage(file, 900, 0.80);
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/* ── Site Images ── */

const ImageField = ({
  imgKey, label, description, siteImages, setSiteImages, toast,
}: {
  imgKey: SiteImageKey; label: string; description: string;
  siteImages: SiteImages; setSiteImages: React.Dispatch<React.SetStateAction<SiteImages>>; toast: any;
}) => {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const current = siteImages[imgKey];
  const [draft, setDraft] = useState(current);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    const newUrl = draft.trim();
    if (!newUrl) return;
    setSaving(true);
    setSiteImages(prev => ({ ...prev, [imgKey]: newUrl })); // optimistic local update
    setEditing(false);
    setFileReady(false);
    try {
      // Each image is its own Firestore document — no 1MB size limit issue
      await setDoc(doc(db, "siteImageData", imgKey), { url: newUrl });
      toast({ title: "Image saved", description: label + " is now live on the website." });
    } catch (err) {
      console.error("Failed to save site image:", err);
      toast({ title: "Save failed", description: "Could not save to database. Please try again.", variant: "destructive" });
      setSiteImages(prev => ({ ...prev, [imgKey]: current })); // revert on failure
    } finally {
      setSaving(false);
    }
  };
  const cancel = () => { setDraft(current); setEditing(false); setFileReady(false); };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFileReady(false);
    try {
      const url = await uploadImage(file);
      setDraft(url);
      setFileReady(true);
    } catch {
      toast({ title: "Upload failed", description: "Could not upload the image.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const previewSrc = editing ? (draft || current) : current;
  const isUploaded = current.includes("firebasestorage") || current.startsWith("data:");

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border last:border-0">
      <div className="shrink-0">
        <img
          src={previewSrc}
          alt={label}
          className="w-full sm:w-36 h-24 object-cover rounded-xl border border-border bg-muted"
          onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/144x96?text=No+Image"; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-foreground text-sm">{label}</p>
        <p className="font-sans text-xs text-muted-foreground mb-2 leading-snug">{description}</p>
        {editing ? (
          <div className="space-y-2">
            {/* URL input */}
            <Input
              value={fileReady ? "" : (draft.startsWith("data:") ? "" : draft)}
              onChange={e => { setDraft(e.target.value); setFileReady(false); }}
              placeholder="Paste image URL here…"
              className="font-sans text-sm"
            />
            {/* Divider */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] font-sans">or upload from PC</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            {/* Upload button */}
            <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-colors font-sans text-sm
              ${uploading ? "border-border text-muted-foreground cursor-not-allowed" : "border-primary/40 text-primary hover:bg-primary/5 hover:border-primary"}`}>
              <Upload className="h-4 w-4 shrink-0" />
              {uploading ? "Uploading…" : fileReady ? "Change file" : "Choose file  (PNG, JPG, SVG, WEBP…)"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleFile}
              />
            </label>
            {fileReady && (
              <p className="text-[11px] text-accent font-sans">✓ Image uploaded — click Save to apply</p>
            )}
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={save} disabled={uploading || saving} className="font-sans">
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel} disabled={saving} className="font-sans">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-sans text-xs text-muted-foreground truncate flex-1">
              {isUploaded ? "📁 Uploaded file" : (current || "Using default image")}
            </p>
            <Button size="sm" variant="outline" onClick={() => { setDraft(current); setEditing(true); }} className="font-sans shrink-0">
              <Edit className="h-3 w-3 mr-1" /> Change
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};


/* ── Team Member Photo Field (used inside SiteImagesTab) ── */
const TeamMemberPhotoField = ({
  member, setTeamMembers, toast,
}: {
  member: any;
  setTeamMembers: React.Dispatch<React.SetStateAction<any[]>>;
  toast: any;
}) => {
  const [editing, setEditing] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [fileReady, setFileReady] = React.useState(false);
  const [draft, setDraft] = React.useState(member.photoUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    const newUrl = draft.trim();
    if (!newUrl) return;
    setSaving(true);
    const updatedMember = { ...member, photoUrl: newUrl };
    setTeamMembers((prev: any[]) => prev.map((m: any) => m.id === member.id ? updatedMember : m));
    setEditing(false);
    setFileReady(false);
    // The setTeamMembers wrapped setter writes teamMembers to Firestore via AdminContext.
    // Give it a moment to compute the new full list, then verify with a small delay toast.
    toast({ title: "Photo saved", description: member.name + "'s photo is now live." });
    setSaving(false);
  };
  const cancel = () => { setDraft(member.photoUrl); setEditing(false); setFileReady(false); };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFileReady(false);
    try {
      const url = await uploadImage(file);
      setDraft(url);
      setFileReady(true);
    } catch {
      toast({ title: "Upload failed", description: "Could not upload the image.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const previewSrc = editing ? (draft || member.photoUrl) : member.photoUrl;
  const isUploaded = member.photoUrl.includes("firebasestorage") || member.photoUrl.startsWith("data:");

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border last:border-0">
      <div className="shrink-0">
        <img
          src={previewSrc}
          alt={member.name}
          className="w-full sm:w-36 h-24 object-cover rounded-xl border border-border bg-muted"
          onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/144x96?text=No+Photo"; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-foreground text-sm">{member.name}</p>
        <p className="font-sans text-xs text-muted-foreground mb-2 leading-snug">{member.role} — photo shown in the Meet Our Team section</p>
        {editing ? (
          <div className="space-y-2">
            <Input
              value={fileReady ? "" : (draft.startsWith("data:") ? "" : draft)}
              onChange={e => { setDraft(e.target.value); setFileReady(false); }}
              placeholder="Paste photo URL here…"
              className="font-sans text-sm"
            />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] font-sans">or upload from PC</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-colors font-sans text-sm
              ${uploading ? "border-border text-muted-foreground cursor-not-allowed" : "border-primary/40 text-primary hover:bg-primary/5 hover:border-primary"}`}>
              <Upload className="h-4 w-4 shrink-0" />
              {uploading ? "Uploading…" : fileReady ? "Change file" : "Choose file  (PNG, JPG, SVG, WEBP…)"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleFile}
              />
            </label>
            {fileReady && (
              <p className="text-[11px] text-accent font-sans">✓ Image uploaded — click Save to apply</p>
            )}
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={save} disabled={uploading || saving} className="font-sans">
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel} disabled={saving} className="font-sans">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="font-sans text-xs text-muted-foreground truncate flex-1">
              {isUploaded ? "📁 Uploaded file" : member.photoUrl}
            </p>
            <Button size="sm" variant="outline" onClick={() => { setDraft(member.photoUrl); setEditing(true); }} className="font-sans shrink-0">
              <Edit className="h-3 w-3 mr-1" /> Change
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const SiteImagesTab = ({ siteImages, setSiteImages, teamMembers, setTeamMembers, toast }: {
  siteImages: SiteImages; setSiteImages: React.Dispatch<React.SetStateAction<SiteImages>>;
  teamMembers: any[]; setTeamMembers: React.Dispatch<React.SetStateAction<any[]>>; toast: any;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-serif font-bold text-foreground">Site Images</h1>
      <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-sans text-accent hover:underline">
        <Eye className="h-4 w-4" /> View Website
      </a>
    </div>
    <p className="text-sm text-muted-foreground font-sans mb-6">
      Edit any image across the website — organized by page and section. Changes go live instantly.
    </p>
    <div className="space-y-5">
      {SITE_IMAGE_GROUPS.map(group => (
        <Card key={group.page} className="shadow-sm">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-serif">{group.page}</CardTitle>
              <a href={group.pageUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-sans hover:underline flex items-center gap-1 shrink-0 ml-2">
                <Eye className="h-3 w-3" /> View section
              </a>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {group.fields.map(f => (
              <ImageField
                key={f.key}
                imgKey={f.key}
                label={f.label}
                description={f.description}
                siteImages={siteImages}
                setSiteImages={setSiteImages}
                toast={toast}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    {/* Team member photos section */}
      {teamMembers.length > 0 ? (
        <Card className="shadow-sm">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-serif">About Us Page — Meet Our Team</CardTitle>
              <a href="/about" target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-sans hover:underline flex items-center gap-1 shrink-0 ml-2">
                <Eye className="h-3 w-3" /> View section
              </a>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {teamMembers.map((m: any) => (
              <TeamMemberPhotoField key={m.id} member={m} setTeamMembers={setTeamMembers} toast={toast} />
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="pt-6 pb-5 text-center text-sm text-muted-foreground font-sans">
            No team members yet. <button className="text-accent underline" onClick={() => {}}>Add them in the Team Members tab</button> to manage their photos here.
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);
export default AdminDashboard;
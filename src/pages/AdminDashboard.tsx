import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin, type JobPosition, type ServiceItem, type ContactInfo } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, MessageSquare, Users, Image, Settings, LogOut, Mail, Star, Trash2, Edit, Plus, Eye, EyeOff, Menu, Briefcase, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { iconNames } from "@/lib/iconMap";

type Tab = "dashboard" | "testimonials" | "team" | "gallery" | "services" | "submissions" | "positions" | "contact-info";

const AdminDashboard = () => {
  const { isAuthenticated, logout, testimonials, setTestimonials, teamMembers, setTeamMembers, gallery, setGallery, services, setServices, submissions, setSubmissions, jobPositions, setJobPositions, contactInfo, setContactInfo } = useAdmin();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  const tabs = [
    { key: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { key: "testimonials" as Tab, label: "Testimonials", icon: MessageSquare },
    { key: "team" as Tab, label: "Team Members", icon: Users },
    { key: "gallery" as Tab, label: "Gallery", icon: Image },
    { key: "services" as Tab, label: "Services", icon: Settings },
    { key: "positions" as Tab, label: "Job Positions", icon: Briefcase },
    { key: "contact-info" as Tab, label: "Contact Info", icon: Phone },
    { key: "submissions" as Tab, label: "Submissions", icon: Mail },
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
          {tab === "services" && <ServicesTab services={services} setServices={setServices} toast={toast} />}
          {tab === "positions" && <PositionsTab positions={jobPositions} setPositions={setJobPositions} toast={toast} />}
          {tab === "contact-info" && <ContactInfoTab contactInfo={contactInfo} setContactInfo={setContactInfo} toast={toast} />}
          {tab === "submissions" && <SubmissionsTab submissions={submissions} setSubmissions={setSubmissions} />}
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
  const add = () => { if (!url) return; setGallery((prev: any[]) => [...prev, { id: Date.now().toString(), url, caption }]); setUrl(""); setCaption(""); toast({ title: "Added" }); };
  const remove = (id: string) => { setGallery((prev: any[]) => prev.filter((g: any) => g.id !== id)); toast({ title: "Removed" }); };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Gallery</h1>
      <Card className="mb-6 shadow-sm"><CardContent className="pt-6 space-y-3">
        <Input placeholder="Image URL" value={url} onChange={e => setUrl(e.target.value)} className="font-sans" />
        <Input placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} className="font-sans" />
        <Button onClick={add} className="font-sans"><Plus className="h-4 w-4 mr-1" /> Add Image</Button>
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

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(form.address)}`;

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
const SubmissionsTab = ({ submissions, setSubmissions }: any) => {
  const toggleRead = (id: string) => { setSubmissions((prev: any[]) => prev.map((s: any) => s.id === id ? { ...s, read: !s.read } : s)); };
  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Submissions</h1>
      <Card className="shadow-sm overflow-hidden"><div className="overflow-x-auto"><Table>
        <TableHeader><TableRow><TableHead>Status</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead className="hidden sm:table-cell">Phone</TableHead><TableHead className="hidden md:table-cell">Service</TableHead><TableHead className="hidden lg:table-cell">Message</TableHead><TableHead className="hidden sm:table-cell">Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {submissions.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground font-sans py-12">No submissions yet</TableCell></TableRow>}
          {submissions.map((s: any) => (
            <TableRow key={s.id} className={s.read ? "opacity-60" : ""}>
              <TableCell>{s.read ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-accent" />}</TableCell>
              <TableCell className="font-sans font-medium">{s.name}</TableCell>
              <TableCell className="font-sans text-sm">{s.email}</TableCell>
              <TableCell className="font-sans text-sm hidden sm:table-cell">{s.phone}</TableCell>
              <TableCell className="font-sans text-sm hidden md:table-cell">{s.service || "—"}</TableCell>
              <TableCell className="font-sans text-sm max-w-xs truncate hidden lg:table-cell">{s.message || "—"}</TableCell>
              <TableCell className="font-sans text-sm hidden sm:table-cell">{new Date(s.date).toLocaleDateString()}</TableCell>
              <TableCell><Button size="sm" variant="ghost" onClick={() => toggleRead(s.id)} className="font-sans text-xs">{s.read ? "Unread" : "Read"}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></div></Card>
    </div>
  );
};

export default AdminDashboard;

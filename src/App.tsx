import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Backpack,
  Bell,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Cross,
  Droplets,
  Flame,
  Fuel,
  Home,
  Map,
  MapPin,
  Menu,
  Package,
  Plus,
  Radio,
  Search,
  Shield,
  Swords,
  Trophy,
  Users,
  Utensils,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type Tab = "central" | "mapa" | "inventario" | "trocas" | "perfil";

const navItems: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "central", label: "Central", icon: Home },
  { id: "mapa", label: "Mapa", icon: Map },
  { id: "inventario", label: "Inventário", icon: Backpack },
  { id: "trocas", label: "Trocas", icon: Swords },
  { id: "perfil", label: "Perfil", icon: CircleUserRound },
];

const supplies = [
  { label: "Água", amount: 12, unit: "un.", icon: Droplets, color: "#46b9cf" },
  { label: "Comida", amount: 8, unit: "un.", icon: Utensils, color: "#d0a94e" },
  { label: "Remédios", amount: 4, unit: "un.", icon: Cross, color: "#da6b56" },
  { label: "Combustível", amount: 6, unit: "L", icon: Fuel, color: "#91a957" },
];

const inventory = [
  ...supplies,
  { label: "Kit de reparo", amount: 2, unit: "un.", icon: Wrench, color: "#a59882" },
  { label: "Bateria", amount: 5, unit: "un.", icon: Zap, color: "#d0a94e" },
];

const shelters = [
  { name: "Estação Norte", type: "Facção", status: "Seguro", x: "24%", y: "36%" },
  { name: "Depósito 12", type: "Público", status: "Seguro", x: "61%", y: "60%" },
  { name: "Clínica Sul", type: "Público", status: "Comprometido", x: "77%", y: "28%" },
];

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo-lockup">
      <span className="logo-mark" aria-hidden="true">
        Z
      </span>
      {!compact && (
        <span className="logo-copy">
          <strong>PROTOCOLO Z</strong>
          <small>Rede de resistência</small>
        </span>
      )}
    </div>
  );
}

function StatusPill({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "red" | "amber";
}) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Countdown() {
  const [seconds, setSeconds] = useState(8 * 60 + 42);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((value) => (value > 0 ? value - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    return `00:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }, [seconds]);

  return (
    <div className="countdown" aria-label={`${time} restantes`}>
      <Clock3 size={16} />
      <span>{time}</span>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      {alertVisible && (
        <div className="horde-alert">
          <span className="alert-icon">
            <AlertTriangle size={21} strokeWidth={2.4} />
          </span>
          <div className="alert-copy">
            <span className="alert-label">ALERTA DE HORDA · ALTA</span>
            <strong>Movimento detectado no Setor 04</strong>
            <small>Reportado há 3 min · 1,2 km de distância</small>
          </div>
          <button className="text-link light" onClick={() => onNavigate("mapa")}>
            Ver no mapa <ArrowRight size={16} />
          </button>
          <button
            className="icon-button alert-close"
            onClick={() => setAlertVisible(false)}
            aria-label="Dispensar alerta"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <div className="survival-status">
            <span className="pulse-dot" />
            SISTEMA OPERACIONAL
          </div>
          <p className="hero-kicker">CENTRAL DE SOBREVIVÊNCIA · DIA 127</p>
          <h1>
            Bom dia, <em>Kael.</em>
          </h1>
          <p className="hero-subtitle">A resistência precisa de você. Mantenha-se alerta.</p>
          <div className="hero-actions">
            <div className="faction-badge">
              <Shield size={20} />
              <span>
                <small>SUA FACÇÃO</small>
                <strong>Sentinelas do Norte</strong>
              </span>
            </div>
            <div className="reputation">
              <Trophy size={18} />
              <span>
                <small>REPUTAÇÃO</small>
                <strong>1.280</strong>
              </span>
              <span className="rank">#12</span>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="card expedition-card">
          <SectionHeader
            eyebrow="MISSÃO ATIVA"
            title="Expedição em andamento"
            action={<StatusPill>Em progresso</StatusPill>}
          />
          <div className="expedition-body">
            <div className="expedition-photo" role="img" aria-label="Fábrica abandonada">
              <span className="risk-tag">
                <AlertTriangle size={13} /> RISCO MÉDIO
              </span>
            </div>
            <div className="expedition-info">
              <span className="sector">SETOR INDUSTRIAL</span>
              <h3>Fábrica abandonada</h3>
              <p>Busca por ferramentas, peças e combustível.</p>
              <div className="timer-row">
                <div>
                  <small>RETORNO ESTIMADO</small>
                  <Countdown />
                </div>
                <div className="team">
                  <small>EQUIPE</small>
                  <div className="avatars">
                    <span>K</span>
                    <span>M</span>
                    <span>+1</span>
                  </div>
                </div>
              </div>
              <div className="progress-track">
                <span />
              </div>
              <p className="progress-copy">72% do percurso concluído</p>
            </div>
          </div>
        </section>

        <section className="card supplies-card">
          <SectionHeader
            eyebrow="SEUS RECURSOS"
            title="Suprimentos"
            action={
              <button className="text-link" onClick={() => onNavigate("inventario")}>
                Ver inventário <ChevronRight size={16} />
              </button>
            }
          />
          <div className="supply-grid">
            {supplies.map((item) => (
              <button
                className="supply-item"
                key={item.label}
                onClick={() => onNavigate("inventario")}
              >
                <span
                  className="supply-icon"
                  style={{ color: item.color, backgroundColor: `${item.color}17` }}
                >
                  <item.icon size={21} />
                </span>
                <span>
                  <small>{item.label}</small>
                  <strong>
                    {item.amount} <em>{item.unit}</em>
                  </strong>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="card activity-card">
          <SectionHeader eyebrow="REDE DE RESISTÊNCIA" title="Atividade recente" />
          <div className="activity-list">
            <button onClick={() => onNavigate("trocas")}>
              <span className="activity-icon trade">
                <Swords size={18} />
              </span>
              <span>
                <strong>Nova proposta de troca</strong>
                <small>Maya oferece 2 kits médicos</small>
              </span>
              <time>2 min</time>
            </button>
            <button onClick={() => onNavigate("mapa")}>
              <span className="activity-icon shelter">
                <Shield size={18} />
              </span>
              <span>
                <strong>Abrigo atualizado</strong>
                <small>Estação Norte está segura</small>
              </span>
              <time>18 min</time>
            </button>
            <button onClick={() => onNavigate("perfil")}>
              <span className="activity-icon rep">
                <Trophy size={18} />
              </span>
              <span>
                <strong>Reputação recebida</strong>
                <small>+15 por cadastrar um abrigo</small>
              </span>
              <time>1 h</time>
            </button>
          </div>
        </section>

        <section className="card quick-card">
          <SectionHeader eyebrow="ACESSO RÁPIDO" title="Próxima ação" />
          <div className="quick-actions">
            <button onClick={() => onNavigate("mapa")}>
              <span>
                <MapPin size={20} />
              </span>
              <strong>Reportar horda</strong>
              <small>Avise a resistência</small>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => onNavigate("trocas")}>
              <span>
                <Swords size={20} />
              </span>
              <strong>Propor troca</strong>
              <small>Negocie suprimentos</small>
              <ChevronRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function MapScreen() {
  const [selected, setSelected] = useState(shelters[0]);

  return (
    <div className="page-screen">
      <SectionHeader
        eyebrow="SETOR 04 · ZONA NORTE"
        title="Mapa da resistência"
        action={
          <button className="primary-button">
            <Plus size={17} /> Novo abrigo
          </button>
        }
      />
      <div className="map-layout">
        <div className="map-canvas">
          <div className="map-search">
            <Search size={17} />
            <span>Buscar setor ou abrigo...</span>
          </div>
          <div className="map-roads road-a" />
          <div className="map-roads road-b" />
          <div className="map-roads road-c" />
          {shelters.map((shelter) => (
            <button
              key={shelter.name}
              className={`map-marker ${selected.name === shelter.name ? "active" : ""} ${shelter.status === "Comprometido" ? "danger" : ""}`}
              style={{ left: shelter.x, top: shelter.y }}
              onClick={() => setSelected(shelter)}
              aria-label={shelter.name}
            >
              {shelter.status === "Comprometido" ? (
                <AlertTriangle size={18} />
              ) : (
                <Shield size={18} />
              )}
            </button>
          ))}
          <div className="horde-zone">
            <span>HORDA</span>
          </div>
          <div className="map-key">
            <span>
              <i className="safe-dot" /> Seguro
            </span>
            <span>
              <i className="danger-dot" /> Alerta
            </span>
          </div>
        </div>
        <aside className="map-detail">
          <div className="detail-photo" />
          <div className="detail-content">
            <div>
              <StatusPill tone={selected.status === "Seguro" ? "green" : "red"}>
                {selected.status}
              </StatusPill>
            </div>
            <h3>{selected.name}</h3>
            <p>Abrigo reforçado com acesso controlado, rádio e estoque de emergência.</p>
            <dl>
              <div>
                <dt>VISIBILIDADE</dt>
                <dd>{selected.type}</dd>
              </div>
              <div>
                <dt>CAPACIDADE</dt>
                <dd>18 pessoas</dd>
              </div>
              <div>
                <dt>RESPONSÁVEL</dt>
                <dd>Kael</dd>
              </div>
            </dl>
            <button className="secondary-button">
              Ver detalhes <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InventoryScreen() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Água", "Comida", "Médico", "Ferramentas"];

  return (
    <div className="page-screen">
      <SectionHeader
        eyebrow="ESTOQUE PESSOAL"
        title="Seu inventário"
        action={<span className="capacity">37 / 50 espaços</span>}
      />
      <div className="filter-row">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="inventory-grid">
        {inventory.map((item) => (
          <article className="inventory-card" key={item.label}>
            <span
              className="inventory-icon"
              style={{ color: item.color, backgroundColor: `${item.color}17` }}
            >
              <item.icon size={28} />
            </span>
            <span className="stock-label">EM ESTOQUE</span>
            <h3>{item.label}</h3>
            <strong>
              {item.amount} <small>{item.unit}</small>
            </strong>
            <div className="stock-bar">
              <span style={{ width: `${item.amount * 7}%`, backgroundColor: item.color }} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TradesScreen() {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="page-screen">
      <SectionHeader
        eyebrow="NEGOCIAÇÕES"
        title="Trocas entre sobreviventes"
        action={
          <button className="primary-button">
            <Plus size={17} /> Nova proposta
          </button>
        }
      />
      <div className="trade-tabs">
        <button className="active">
          Recebidas <span>{accepted ? 1 : 2}</span>
        </button>
        <button>Enviadas</button>
        <button>Histórico</button>
      </div>
      <div className="trades-list">
        {!accepted && (
          <article className="trade-card featured">
            <div className="trader">
              <span className="avatar">M</span>
              <div>
                <small>PROPOSTA DE</small>
                <strong>Maya Santos</strong>
                <span>Sentinelas do Norte · há 2 min</span>
              </div>
              <StatusPill tone="amber">Pendente</StatusPill>
            </div>
            <div className="exchange">
              <div>
                <small>VOCÊ RECEBE</small>
                <strong>
                  <Cross size={19} /> 2 Kits médicos
                </strong>
              </div>
              <span className="exchange-icon">
                <ArrowRight size={18} />
              </span>
              <div>
                <small>VOCÊ ENTREGA</small>
                <strong>
                  <Fuel size={19} /> 3L Combustível
                </strong>
              </div>
            </div>
            <div className="trade-actions">
              <button className="ghost-button">Recusar</button>
              <button className="primary-button" onClick={() => setAccepted(true)}>
                Aceitar troca
              </button>
            </div>
          </article>
        )}
        <article className="trade-card">
          <div className="trader">
            <span className="avatar alt">R</span>
            <div>
              <small>PROPOSTA DE</small>
              <strong>Ravi Costa</strong>
              <span>Filhos do Asfalto · ontem</span>
            </div>
            <StatusPill>Concluída</StatusPill>
          </div>
          <div className="exchange compact">
            <div>
              <small>VOCÊ RECEBEU</small>
              <strong>4 Água</strong>
            </div>
            <ArrowRight size={17} />
            <div>
              <small>VOCÊ ENTREGOU</small>
              <strong>2 Baterias</strong>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="page-screen profile-screen">
      <div className="profile-hero">
        <span className="large-avatar">K</span>
        <div>
          <span className="eyebrow">SOBREVIVENTE ATIVO</span>
          <h1>Kael Duarte</h1>
          <p>kael@resistencia.org</p>
        </div>
        <div className="profile-faction">
          <Shield size={23} />
          <span>
            <small>FACÇÃO</small>
            <strong>Sentinelas do Norte</strong>
          </span>
        </div>
      </div>
      <div className="stats-grid">
        {[
          ["1.280", "Reputação", Trophy],
          ["14", "Expedições", Compass],
          ["8", "Trocas", Swords],
          ["6", "Abrigos", Shield],
        ].map(([value, label, Icon]) => (
          <article key={String(label)}>
            <Icon size={20} />
            <strong>{value as string}</strong>
            <span>{label as string}</span>
          </article>
        ))}
      </div>
      <section className="card profile-card">
        <SectionHeader eyebrow="IDENTIFICAÇÃO" title="Registro de sobrevivente" />
        <div className="record-grid">
          <div>
            <small>MEMBRO DESDE</small>
            <strong>Dia 03</strong>
          </div>
          <div>
            <small>ÚLTIMA ATIVIDADE</small>
            <strong>Agora</strong>
          </div>
          <div>
            <small>ALERTAS CONFIRMADOS</small>
            <strong>12</strong>
          </div>
          <div>
            <small>POSIÇÃO GLOBAL</small>
            <strong>#12</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("central");
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </button>
        <button className="logo-button" onClick={() => goTo("central")}>
          <LogoMark />
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navegação principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeTab === item.id ? "active" : ""}
              onClick={() => goTo(item.id)}
            >
              <item.icon size={17} /> {item.label}
              {item.id === "trocas" && <span className="nav-count">2</span>}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button notification" aria-label="Notificações">
            <Bell size={19} />
            <span />
          </button>
          <button className="user-chip" onClick={() => goTo("perfil")}>
            <span className="mini-avatar">K</span>
            <span>
              <strong>Kael</strong>
              <small>Sentinela</small>
            </span>
          </button>
        </div>
      </header>

      <main>
        {activeTab === "central" && <HomeScreen onNavigate={goTo} />}
        {activeTab === "mapa" && <MapScreen />}
        {activeTab === "inventario" && <InventoryScreen />}
        {activeTab === "trocas" && <TradesScreen />}
        {activeTab === "perfil" && <ProfileScreen />}
      </main>

      <footer>
        <LogoMark compact />
        <p>PROTOCOLO Z · CANAL SEGURO 04</p>
        <span>
          <Radio size={14} /> REDE ATIVA
        </span>
      </footer>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeTab === item.id ? "active" : ""}
            onClick={() => goTo(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {item.id === "trocas" && <i>2</i>}
          </button>
        ))}
      </nav>
    </div>
  );
}

import type { Metadata } from "next";
import { CartDemo } from "@/components/cart/cart-demo";
import { DownloadIcon, FavoriteButton, SuccessCheck } from "@/components/ui/animated-icons";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { CategoryIllustration, categories } from "@/components/ui/category-illustration";
import { Field } from "@/components/ui/field";
import { Sheet, ToastDemo } from "@/components/ui/overlays";
import { ProductCard } from "@/components/ui/product-card";
import { SeriesProgress } from "@/components/ui/series-progress";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { contrast } from "@/lib/contrast";

export const metadata: Metadata = {
  title: "Design system | Clairivo",
  robots: { index: false, follow: false },
};

const couleurs = [
  { nom: "Ivoire", token: "ivoire", hex: "#FFF9F2", role: "Fond des pages" },
  { nom: "Encre", token: "encre", hex: "#20202A", role: "Texte et bordures" },
  { nom: "Corail", token: "corail", hex: "#FF7048", role: "Action principale, héros" },
  { nom: "Violet", token: "violet", hex: "#7657E8", role: "Séries, focus, liens actifs" },
  { nom: "Soleil", token: "soleil", hex: "#FFD45A", role: "Mise en avant douce" },
  { nom: "Menthe", token: "menthe", hex: "#75D7B0", role: "Gratuit, succès" },
  { nom: "Rose", token: "rose", hex: "#F58DB7", role: "Accent des couvertures" },
  { nom: "Gris encre", token: "encre-2", hex: "#686575", role: "Texte secondaire" },
];

// Couples réellement utilisés par les composants, mode clair puis sombre.
const couples: { usage: string; texte: string; fond: string; min: number }[] = [
  { usage: "Texte courant, clair", texte: "#20202A", fond: "#FFF9F2", min: 4.5 },
  { usage: "Texte secondaire, clair", texte: "#686575", fond: "#FFF9F2", min: 4.5 },
  { usage: "Bouton principal", texte: "#20202A", fond: "#FF7048", min: 4.5 },
  { usage: "Badge série", texte: "#FFF9F2", fond: "#7657E8", min: 4.5 },
  { usage: "Badge gratuit", texte: "#20202A", fond: "#75D7B0", min: 4.5 },
  { usage: "Badge bientôt", texte: "#20202A", fond: "#FFD45A", min: 4.5 },
  { usage: "Erreur, clair", texte: "#B3261E", fond: "#FFFFFF", min: 4.5 },
  { usage: "Texte courant, sombre", texte: "#F6F0E8", fond: "#17161D", min: 4.5 },
  { usage: "Texte secondaire, sombre", texte: "#B5B0BF", fond: "#17161D", min: 4.5 },
  { usage: "Erreur, sombre", texte: "#FF9A8F", fond: "#211F29", min: 4.5 },
  { usage: "Contour de champ, clair (élément graphique)", texte: "#20202A", fond: "#FFFFFF", min: 3 },
];

const espaces = [4, 8, 12, 16, 24, 32, 48, 64, 96];

function Section({ id, titre, children }: { id: string; titre: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-ligne py-14">
      <h2 id={id} className="text-3xl font-bold tracking-[-0.02em]">
        {titre}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Design() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <p className="font-titre text-sm font-semibold uppercase tracking-[0.08em] text-encre-2">Interne, non indexé</p>
      <h1 className="mt-3 max-w-[18ch] text-4xl font-bold leading-tight tracking-[-0.03em] md:text-6xl">Le design system de Clairivo.</h1>
      <p className="mt-5 max-w-[60ch] text-lg text-encre-2">
        Tout ce qui sert à construire les écrans, avec les vrais composants. Bascule le thème clair ou sombre de ton système pour vérifier les deux.
      </p>

      <Section id="couleurs" titre="Couleurs">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {couleurs.map((c) => (
            <li key={c.token}>
              <div className="h-20 rounded-2xl border-2 border-encre" style={{ background: `var(--${c.token})` }} />
              <p className="mt-2 font-titre font-semibold">{c.nom}</p>
              <p className="text-sm text-encre-2">
                {c.hex} · {c.role}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-xl font-semibold">Contrastes vérifiés (WCAG 2.2 AA)</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-136 text-left text-sm">
            <caption className="sr-only">Rapports de contraste des couples de couleurs utilisés</caption>
            <thead>
              <tr className="border-b-2 border-encre">
                <th scope="col" className="py-2 pr-4">Usage</th>
                <th scope="col" className="py-2 pr-4">Aperçu</th>
                <th scope="col" className="py-2 pr-4">Rapport</th>
                <th scope="col" className="py-2">Seuil</th>
              </tr>
            </thead>
            <tbody>
              {couples.map((c) => {
                const r = contrast(c.texte, c.fond);
                return (
                  <tr key={c.usage} className="border-b border-ligne">
                    <th scope="row" className="py-2 pr-4 font-medium">{c.usage}</th>
                    <td className="py-2 pr-4">
                      <span className="rounded-lg px-2 py-1 font-semibold" style={{ color: c.texte, background: c.fond }}>Aa</span>
                    </td>
                    <td className="py-2 pr-4 tabular-nums">{r.toFixed(2)}</td>
                    <td className="py-2">{r >= c.min ? `OK (≥ ${c.min})` : `Insuffisant (< ${c.min})`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="typo" titre="Typographie">
        <div className="space-y-6">
          <p className="font-titre text-6xl font-bold leading-none tracking-[-0.03em]">Sora 700, titres</p>
          <p className="font-titre text-3xl font-semibold tracking-[-0.02em]">Sora 600, sous-titres et prix</p>
          <p className="max-w-[60ch] text-lg leading-8">Inter 400, texte courant. Lignes de 60 caractères environ, interligne généreux, chiffres tabulaires pour les prix.</p>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-encre-2">Inter 600, étiquette en capitales</p>
        </div>
      </Section>

      <Section id="espaces" titre="Espacement, rayons, bordures">
        <ul className="space-y-2">
          {espaces.map((e) => (
            <li key={e} className="flex items-center gap-4 text-sm">
              <span className="w-12 tabular-nums text-encre-2">{e} px</span>
              <span className="h-3 bg-violet" style={{ width: e }} />
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[60ch] text-encre-2">
          Une seule échelle, sans valeur intermédiaire. Style arrondi : boutons et champs en pastille complète (comme la navigation), cartes très arrondies. Contours de 2 px à la place des ombres : le relief vient du contraste, pas du flou.
        </p>
      </Section>

      <Section id="boutons" titre="Boutons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Principal</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="quiet">Discret</Button>
          <Button size="sm">Petit</Button>
          <Button loading>Principal</Button>
          <Button disabled>Désactivé</Button>
          <ButtonLink href="/">Lien en bouton</ButtonLink>
        </div>
      </Section>

      <Section id="champs" titre="Champs">
        <div className="grid max-w-3xl gap-6 md:grid-cols-2">
          <Field label="Adresse e-mail" type="email" placeholder="prenom@exemple.fr" hint="Pour recevoir ton lien d'accès." />
          <Field label="Adresse e-mail" type="email" defaultValue="pas-un-mail" error="Cette adresse e-mail ne semble pas valide." />
        </div>
      </Section>

      <Section id="badges" titre="Badges honnêtes">
        <div className="flex flex-wrap gap-3">
          <Badge tone="gratuit">Gratuit</Badge>
          <Badge tone="bientot">Bientôt</Badge>
          <Badge tone="serie">Série · 5 épisodes</Badge>
          <Badge>Débutant</Badge>
        </div>
        <p className="mt-4 max-w-[60ch] text-encre-2">Un badge énonce un fait. Aucun « populaire » ni « nouveau » sans donnée réelle derrière.</p>
      </Section>

      <Section id="cartes" titre="Carte produit et états">
        <p className="mb-6 max-w-[60ch] text-encre-2">Exemples de mise en page avec les ressources annoncées, pas un catalogue en vente.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            href="/design"
            cover={{ fond: "#FFD45A", encre: "#20202A", accent: "#F58DB7", format: "Checklist", sujet: "Emploi", forme: "cercle" }}
            titre="Checklist CV professionnel"
            pour="Relire son CV point par point avant d'envoyer."
            prixCents={0}
            badge={<Badge tone="bientot">Bientôt</Badge>}
          />
          <ProductCard
            href="/design"
            cover={{ fond: "#7657E8", encre: "#FFF9F2", accent: "#FFD45A", format: "Guide", sujet: "IA", forme: "arcs" }}
            titre="Comprendre l'IA générative"
            pour="Ce que ces outils font vraiment, et comment les utiliser."
            prixCents={499}
            badge={<Badge tone="serie">Série</Badge>}
          />
          <ProductCard
            href="/design"
            cover={{ fond: "#75D7B0", encre: "#20202A", accent: "#FFF9F2", format: "Checklist", sujet: "Freelance", forme: "bandes", droite: true }}
            titre="Checklist lancement freelance"
            categorie="Organisation et productivité"
            pour="Ne rien oublier avant de facturer."
            prixCents={299}
          />
          <ProductCardSkeleton />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <StatePanel titre="Rien ne correspond à ces filtres." action={<Button variant="secondary" size="sm">Effacer les filtres</Button>}>
            Essaie un autre niveau ou retire la durée. Tous les guides restent à portée.
          </StatePanel>
          <StatePanel tone="erreur" titre="Le paiement n&apos;a pas abouti." action={<Button size="sm">Réessayer</Button>}>
            Tu n&apos;as pas été débité. Vérifie les informations de ta carte ou essaie un autre moyen de paiement.
          </StatePanel>
        </div>
      </Section>

      <Section id="series" titre="Progression de série">
        <div className="max-w-md space-y-6">
          <SeriesProgress label="Épisodes terminés" done={2} total={5} />
          <SeriesProgress label="Épisodes terminés" done={0} total={5} />
          <SeriesProgress label="Épisodes terminés" done={5} total={5} />
        </div>
      </Section>

      <Section id="overlays" titre="Modale, tiroir, notification">
        <div className="flex flex-wrap gap-4">
          <Sheet titre="Supprimer ce favori ?" ouvrir="Ouvrir la modale">
            <p className="text-encre-2">Tu pourras le remettre à tout moment depuis la fiche du produit.</p>
          </Sheet>
          <Sheet titre="Filtres" ouvrir="Ouvrir le tiroir" cote="droite">
            <p className="text-encre-2">Thème, format, niveau, prix et durée s&apos;afficheront ici sur mobile.</p>
          </Sheet>
          <ToastDemo declencheur="Afficher une notification" message="Ajouté à ta bibliothèque." />
        </div>
      </Section>

      <Section id="panier" titre="Panier">
        <CartDemo />
        <p className="mt-6 max-w-[60ch] text-encre-2">Tiroir en verre ouvert depuis la nav. Une ligne par ressource, total TTC en centimes, état vide avec sortie vers le catalogue. Le prix affiché est recalculé par le serveur au paiement.</p>
      </Section>

      <Section id="illustrations" titre="Illustrations par univers">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <li key={c.id}>
              <CategoryIllustration id={c.id} className="w-full" />
              <p className="mt-2 font-titre font-semibold">{c.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[60ch] text-encre-2">Dessins originaux à plat, palette de la marque, contour encre de 4 unités. Un par univers, réutilisables sur l&apos;accueil, les pages de catégorie et les états vides.</p>
      </Section>

      <Section id="icones" titre="Icônes animées">
        <div className="flex flex-wrap items-center gap-8">
          <FavoriteButton />
          <DownloadIcon />
          <SuccessCheck />
        </div>
        <p className="mt-6 max-w-[60ch] text-encre-2">Chaque animation confirme une action : favori ajouté, téléchargement lancé, paiement validé. Moins de 400 ms, désactivées si le système demande moins de mouvement.</p>
      </Section>

      <Section id="mouvement" titre="Mouvement">
        <ul className="max-w-[60ch] list-disc space-y-2 pl-5 text-encre-2">
          <li>Un seul moment mis en scène par page (sur l&apos;accueil : le déploiement des couvertures).</li>
          <li>Micro-interactions de 150 à 200 ms : appui des boutons, barre de série. Aucun effet de survol (zoom, déplacement) sur les cartes.</li>
          <li>Seules les propriétés transform et opacity sont animées, sauf la largeur de la barre de série.</li>
          <li>Tout est neutralisé quand le système demande moins de mouvement.</li>
        </ul>
      </Section>
    </main>
  );
}

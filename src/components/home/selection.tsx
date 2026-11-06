import { SelectionGrid } from "@/components/home/selection-grid";
import { ButtonLink } from "@/components/ui/button";
import { ressources } from "@/lib/selection";

const choix = ["checklist-cv-professionnel", "comprendre-ia-generative", "planner-budget-mensuel", "checklist-lancement-freelance"];

export function Selection() {
  const items = ressources.filter((r) => choix.includes(r.slug));
  return (
    <section id="selection" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <h2 className="max-w-[20ch] font-titre text-4xl font-bold leading-tight tracking-tight md:text-5xl">Une première sélection.</h2>
      <p className="mt-4 max-w-[52ch] text-lg text-encre-2">Quatre ressources gratuites prévues à l&apos;ouverture de la boutique.</p>
      <div className="mt-10">
        <SelectionGrid items={items} />
      </div>
      <div className="mt-10">
        <ButtonLink href="/catalogue" variant="secondary">
          Voir tout le catalogue
        </ButtonLink>
      </div>
    </section>
  );
}

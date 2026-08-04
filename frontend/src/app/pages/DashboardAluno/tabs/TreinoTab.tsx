import { useState } from "react";
import { Play, MessageSquare, Clock, Layers, Weight, CheckCircle2, Circle } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  load: string;
  rest: string;
  notes?: string;
  hasVideo: boolean;
}

const WORKOUTS: Record<string, { label: string; focus: string; exercises: Exercise[] }> = {
  A: {
    label: "Treino A",
    focus: "Peito e Tríceps",
    exercises: [
      { id: "a1", name: "Supino reto", muscleGroup: "Peito", sets: 4, reps: "10", load: "40kg", rest: "90s", notes: "Desça controlado, 2s na fase excêntrica.", hasVideo: true },
      { id: "a2", name: "Supino inclinado com halteres", muscleGroup: "Peito", sets: 3, reps: "12", load: "16kg", rest: "75s", hasVideo: true },
      { id: "a3", name: "Crucifixo no cabo", muscleGroup: "Peito", sets: 3, reps: "15", load: "12kg", rest: "60s", hasVideo: false },
      { id: "a4", name: "Tríceps corda", muscleGroup: "Tríceps", sets: 4, reps: "12", load: "20kg", rest: "60s", notes: "Cotovelos fixos ao lado do corpo.", hasVideo: true },
      { id: "a5", name: "Tríceps testa", muscleGroup: "Tríceps", sets: 3, reps: "10", load: "18kg", rest: "60s", hasVideo: false },
    ],
  },
  B: {
    label: "Treino B",
    focus: "Costas e Bíceps",
    exercises: [
      { id: "b1", name: "Puxada frente", muscleGroup: "Costas", sets: 4, reps: "12", load: "45kg", rest: "90s", hasVideo: true },
      { id: "b2", name: "Remada curvada", muscleGroup: "Costas", sets: 4, reps: "10", load: "30kg", rest: "90s", notes: "Mantenha a coluna neutra.", hasVideo: true },
      { id: "b3", name: "Remada baixa", muscleGroup: "Costas", sets: 3, reps: "12", load: "35kg", rest: "75s", hasVideo: false },
      { id: "b4", name: "Rosca direta", muscleGroup: "Bíceps", sets: 3, reps: "12", load: "14kg", rest: "60s", hasVideo: true },
      { id: "b5", name: "Rosca alternada", muscleGroup: "Bíceps", sets: 3, reps: "10", load: "10kg", rest: "60s", hasVideo: false },
    ],
  },
  C: {
    label: "Treino C",
    focus: "Pernas",
    exercises: [
      { id: "c1", name: "Agachamento livre", muscleGroup: "Quadríceps", sets: 4, reps: "10", load: "60kg", rest: "120s", notes: "Foco na profundidade, joelho alinhado ao pé.", hasVideo: true },
      { id: "c2", name: "Leg press 45°", muscleGroup: "Quadríceps", sets: 4, reps: "12", load: "120kg", rest: "90s", hasVideo: true },
      { id: "c3", name: "Cadeira extensora", muscleGroup: "Quadríceps", sets: 3, reps: "15", load: "35kg", rest: "60s", hasVideo: false },
      { id: "c4", name: "Mesa flexora", muscleGroup: "Posterior", sets: 3, reps: "12", load: "30kg", rest: "60s", hasVideo: false },
      { id: "c5", name: "Elevação pélvica", muscleGroup: "Glúteos", sets: 4, reps: "15", load: "40kg", rest: "60s", hasVideo: true },
    ],
  },
};

export const TreinoTab = () => {
  const [activeDay, setActiveDay] = useState("A");
  const [done, setDone] = useState<Record<string, boolean>>({});

  const workout = WORKOUTS[activeDay];
  const completedCount = workout.exercises.filter((e) => done[e.id]).length;

  const toggleDone = (id: string) => setDone((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Ficha de treino</h2>
          <p className="text-complexo-muted">Montada pelo seu personal — atualizada semanalmente.</p>
        </div>
        <div className="flex gap-2">
          {Object.entries(WORKOUTS).map(([key, w]) => (
            <button
              key={key}
              onClick={() => setActiveDay(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeDay === key
                  ? "bg-complexo-red text-white"
                  : "border border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <SectionCard
        title={`${workout.label} — ${workout.focus}`}
        action={
          <span className="font-mono text-xs uppercase tracking-widest text-complexo-muted">
            {completedCount}/{workout.exercises.length} concluídos
          </span>
        }
      >
        <div className="space-y-3">
          {workout.exercises.map((ex) => (
            <div
              key={ex.id}
              className={`rounded-xl border p-4 transition-colors ${
                done[ex.id] ? "border-complexo-red/30 bg-complexo-red/5" : "border-complexo-light/10 bg-complexo-panel"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-complexo-red">
                    {ex.muscleGroup}
                  </span>
                  <h3 className="font-rajdhani text-lg font-bold uppercase text-complexo-light">{ex.name}</h3>
                </div>
                <button
                  onClick={() => toggleDone(ex.id)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    done[ex.id]
                      ? "bg-complexo-red text-white"
                      : "border border-complexo-light/15 text-complexo-muted hover:text-complexo-light"
                  }`}
                >
                  {done[ex.id] ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                  {done[ex.id] ? "Concluído" : "Marcar como feito"}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-complexo-muted">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> {ex.sets}x{ex.reps}
                </span>
                <span className="flex items-center gap-1.5">
                  <Weight className="h-3.5 w-3.5" /> {ex.load}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {ex.rest} de descanso
                </span>
                <button
                  disabled={!ex.hasVideo}
                  className={`flex items-center gap-1.5 ${
                    ex.hasVideo ? "text-complexo-red hover:text-complexo-red-bright" : "cursor-not-allowed text-complexo-light/20"
                  }`}
                  title={ex.hasVideo ? "Assistir vídeo demonstrativo" : "Vídeo em breve"}
                >
                  <Play className="h-3.5 w-3.5" /> {ex.hasVideo ? "Vídeo demonstrativo" : "Vídeo em breve"}
                </button>
              </div>

              {ex.notes && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-complexo-light/5 p-3 text-sm text-complexo-light/85">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-complexo-red" />
                  {ex.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

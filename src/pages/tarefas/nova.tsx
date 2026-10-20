import { useRouter } from "next/router";
import { FormularioTarefa } from "@/src/components/tarefas/formulario";

export default function NovaTarefa() {

    const router = useRouter();

    const tarefaSalva = () => {
        router.push("/tarefas");
    };

    return (
        <FormularioTarefa
            onSalvar={tarefaSalva}
        />
    );
}

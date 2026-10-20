interface MenssagemProps {
    tipo: string;
    field?: string;
    texto: string;
}

export interface Alert {
    id: string;
    tipo: string;
    field?: string;
    texto: string;
}

export const Menssagem: React.FC<MenssagemProps> = ({
    texto,
    field,
    tipo
}) => {
    return (
        <article className={`message is-${tipo}`}>
            <div className="message-body">
                {field && `${field} :`}{texto}
            </div>
        </article>
    )
}
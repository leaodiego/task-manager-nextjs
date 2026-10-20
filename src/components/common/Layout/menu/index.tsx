import Link from "next/link";

export const Menu: React.FC = () => {
    return (
        <div>
            <aside className="menu">

                <p className="menu-label">
                    Gerenciador de Tarefas
                </p>
                <ul className="menu-list">
                <MenuItem href="/" label="Dashboard" />
                <MenuItem href="/tarefas" label="Tarefas" />
            </ul>
            
            </aside>

            
        </div>
    );
};

interface MenuItemProps {
    href: string;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <li>
            <Link href={props.href}>
                {props.label}
            </Link>
        </li>
    );
};
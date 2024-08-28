import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


export const BaseNavPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const linkClasses = (path: string) => {
        return `block mt-4 md:inline-block text-base md:mt-0 text-white hover:text-gray-200 mr-4 ${location.pathname.startsWith(path) ? 'font-bold border-b-2 border-white' : ''
            }`;
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-6">
            <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6 hover:scale-110 duration-100">
                <span className="font-semibold text-xl tracking-tight">GYM</span>
            </Link>
            <div className="block md:hidden">
                <button
                    onClick={toggleMenu}
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`}>
                <div className="text-sm md:flex-grow">
                    <Link to="/planos" className={linkClasses('/planos')}>
                        Planos
                    </Link>
                    <Link to="/alunos" className={linkClasses('/alunos')}>
                        Alunos
                    </Link>
                    <Link to="/fichas-treino" className={linkClasses('/fichas-treino')}>
                        Treinos
                    </Link>
                </div>
            </div>
        </nav>
    );
};

import { Link } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";


export const FichasTreinoList = () => {


    return (
        <>
            <BaseNavPage />
            <div className="container mx-auto px-4">
                <div className="flex justify-between itens-center mb-4">
                    <p className="text-3xl font-medium">Fichas de treino cadastradas</p>
                    <Link to="add" className="flex items-center justify-center bg-indigo-800 text-white font-bold p-2 rounded-md">
                        <svg width="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="10" width="20" height="80" rx="10" ry="10" fill="#fff" />
                            <rect x="10" y="40" width="80" height="20" rx="10" ry="10" fill="#fff" />
                        </svg>
                        Add ficha de treino
                    </Link>
                </div>
            </div>

        </>
    );
};

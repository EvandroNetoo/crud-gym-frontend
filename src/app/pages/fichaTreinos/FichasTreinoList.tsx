import { Link } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { FichaTreinoModel } from "../../shared/models/FichaTreinoModel";
import { useEffect, useState } from "react";
import FichasTreinoService from "../../shared/services/FichasTreinoService";
import trash from "../../shared/assets/trash.svg"
import pencil from "../../shared/assets/pencil.svg"

export const FichasTreinoList = () => {
    const [fichasTreino, setFichasTreino] = useState<FichaTreinoModel[]>([])
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        const data = await FichasTreinoService.getAll();
        setFichasTreino(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAluno = async (fichaTreinoId: string) => {
        setErrorMessage('')
        try {
            await FichasTreinoService.delete(fichaTreinoId);
            fetchData()
        } catch {
            setErrorMessage('Não foi possível excluir o aluno.')
        }
    }

    return (
        <>
            <BaseNavPage />
            <div className="container mx-auto px-4">
                <div className="flex justify-between itens-center mb-4">
                    <p className="text-3xl font-medium">Fichas de treino cadastradas</p>
                    <Link to="novo" className="flex items-center justify-center bg-indigo-800 text-white font-bold p-2 rounded-md">
                        <svg width="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="10" width="20" height="80" rx="10" ry="10" fill="#fff" />
                            <rect x="10" y="40" width="80" height="20" rx="10" ry="10" fill="#fff" />
                        </svg>
                        Add Ficha de Treino
                    </Link>
                </div>

                {errorMessage ? <p className="text-red-500 mb-3">{errorMessage}</p> : ''}

                <table className="min-w-full bg-transparent border-0">
                    <thead>
                        <tr className="bg-green-300">
                            <th className="px-4 py-2 border-b text-left">DATA</th>
                            <th className="px-4 py-2 border-b text-left">EXERCÍCIOS</th>
                            <th className="px-4 py-2 border-b">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fichasTreino.map(fichaTreino => (
                            <tr key={fichaTreino.id} className="hover:bg-green-200 duration-100 border-green-500 border-y-2">
                                <td className="px-4 py-2 border-b">
                                    {(() => {
                                        const date = new Date(fichaTreino.data);
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const year = date.getFullYear();
                                        const hours = String(date.getHours()).padStart(2, '0');
                                        const minutes = String(date.getMinutes()).padStart(2, '0');

                                        return `${day}/${month}/${year} ${hours}:${minutes}`;
                                    })()}
                                </td>

                                <td className="px-4 py-2 border-b">
                                    <div className="relative group">
                                            Passe o mouse para ver os exercícios

                                        <div className="absolute left-0 top-full mt-2 p-4 bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                                            <ol>{fichaTreino.exercicios.map(exercicio => <li key={`${fichaTreino.id}-${exercicio}`}>{exercicio}</li>)}</ol>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-2 border-b text-center flex space-x-2 justify-center">
                                    <Link to={`/fichas-treino/${fichaTreino.id}`} className="text-indigo-600 hover:underline">
                                        <img src={pencil} width={20} />
                                    </Link>
                                    <button onClick={() => handleDeleteAluno(fichaTreino.id)}>
                                        <img src={trash} width={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </>
    );
};

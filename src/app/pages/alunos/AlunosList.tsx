import { Link } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { AlunoModel } from "../../shared/models/AlunoModel";
import { useEffect, useState } from "react";
import AlunosService from "../../shared/services/AlunosService";
import trash from "../../shared/assets/trash.svg"
import pencil from "../../shared/assets/pencil.svg"

export const AlunosList = () => {
    const [alunos, setAlunos] = useState<AlunoModel[]>([])
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        const data = await AlunosService.getAll();
        setAlunos(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAluno = async (aluno_id: string) => {
        setErrorMessage('')
        try {
            await AlunosService.delete(aluno_id);
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
                    <p className="text-3xl font-medium">Alunos cadastrados</p>
                    <Link to="novo" className="flex items-center justify-center bg-indigo-800 text-white font-bold p-2 rounded-md">
                        <svg width="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="10" width="20" height="80" rx="10" ry="10" fill="#fff" />
                            <rect x="10" y="40" width="80" height="20" rx="10" ry="10" fill="#fff" />
                        </svg>
                        Add Aluno
                    </Link>
                </div>

                {errorMessage ? <p className="text-red-500 mb-3">{errorMessage}</p> : ''}

                <table className="min-w-full bg-transparent border-0">
                    <thead>
                        <tr className="bg-green-300">
                            <th className="px-4 py-2 border-b text-left">NOME</th>
                            <th className="px-4 py-2 border-b text-left">EMAIL</th>
                            <th className="px-4 py-2 border-b text-left">TELEFONE</th>
                            <th className="px-4 py-2 border-b">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map(aluno => (
                            <tr key={aluno.id} className="hover:bg-green-200 duration-100 border-green-500 border-y-2">
                                <td className="px-4 py-2 border-b">{aluno.nome}</td>
                                <td className="px-4 py-2 border-b">{aluno.email}</td>
                                <td className="px-4 py-2 border-b">{aluno.telefone}</td>

                                <td className="px-4 py-2 border-b text-center flex space-x-2 justify-center">
                                    <Link to={`/alunos/${aluno.id}`} className="text-indigo-600 hover:underline">
                                        <img src={pencil} width={20} />
                                    </Link>
                                    <button onClick={() => handleDeleteAluno(aluno.id)}>
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

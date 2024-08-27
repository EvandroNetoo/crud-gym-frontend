import { useParams, useNavigate } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { InputField } from "../../shared/components/InputField";
import { useRef, useState } from "react";
import PlanosService from "../../shared/services/PlanosService"; // Ajuste o caminho conforme necessário
import { PlanoModel } from "../../shared/models/PlanoModel"; // Ajuste o caminho conforme necessário

export const FichaTreinoForm = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = id === 'add' ? 'Novo aluno' : 'Editar aluno';
    const nomePlanoRef = useRef<HTMLInputElement>(null);
    const valorRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<{ nome?: string; valor?: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Limpa erros anteriores
        setErrors({});
        setSuccessMessage(null);

        // Obtém valores dos inputs
        const nome = nomePlanoRef.current?.value || '';
        const valor = valorRef.current?.value || '';

        let hasErrors = false;
        const newErrors: { nome?: string; valor?: string } = {};

        // Validação do nome
        if (nome.length < 3) {
            newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
            hasErrors = true;
        }

        // Validação do valor
        if (isNaN(Number(valor)) || Number(valor) <= 0) {
            newErrors.valor = 'O valor deve ser maior que 0.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Criação do novo plano
        const newPlano: Omit<PlanoModel, 'id'> = {
            nomePlano: nome,
            valor: Number(valor),
        };

        try {
            await PlanosService.create(newPlano);
            setSuccessMessage('Plano adicionado com sucesso!');
            navigate('/planos');
        } catch (error) {
            setErrors({ nome: 'Erro ao adicionar o plano. Tente novamente.' });
        }
    };

    return (
        <>
            <BaseNavPage />
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="flex flex-col w-full max-w-md mb-4">
                    <p className="text-3xl font-medium mb-3 text-center">{title}</p>

                    <InputField
                        label="Data"
                        name="data"
                        ref={nomePlanoRef}
                        error={errors.nome}
                    />

                    <div className="mb-3">
                        <label htmlFor="descricao" className="font-bold text-left block mb-1">Descrição</label>
                        <textarea id="descricao" rows={2} className="duration-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-whit"></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="plano" className="font-bold text-left block mb-1">Aluno</label>
                        <select id="plano" className="duration-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-whit">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>

                    <button
                        className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>

                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
            </div>
        </>
    );
};

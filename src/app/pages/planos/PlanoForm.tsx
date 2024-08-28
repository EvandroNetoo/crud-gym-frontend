import { useParams, useNavigate } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { InputField } from "../../shared/components/InputField";
import { useEffect, useRef, useState } from "react";
import PlanosService from "../../shared/services/PlanosService"; // Ajuste o caminho conforme necessário
import { PlanoModel } from "../../shared/models/PlanoModel"; // Ajuste o caminho conforme necessário

export const PlanoForm = () => {
    let { id } = useParams();
    const [plano, setPlano] = useState<PlanoModel>()

    const fetchPlano = async () => {
        setPlano(await PlanosService.getById(id || ''))
    }
    useEffect(() => {
        fetchPlano();
    }, []);


    const title = id ? 'Editar plano' : 'Novo plano';

    const navigate = useNavigate();

    const nomePlanoRef = useRef<HTMLInputElement>(null);
    const valorRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<{ nome?: string; valor?: string }>({});

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Limpa erros anteriores
        setErrors({});

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

        const Plano: Omit<PlanoModel, 'id'> = {
            nomePlano: nome,
            valor: Number(valor),
        };

        if (!id) {
            try {

                await PlanosService.create(Plano);
                navigate('/planos');
            } catch (error) {
                setErrors({ nome: 'Erro ao adicionar o plano. Tente novamente.' });
            }
        } else {
            try {
                await PlanosService.update(id, Plano);
                navigate('/planos');
            } catch (error) {
                setErrors({ nome: 'Erro ao adicionar o plano. Tente novamente.' });
            }
        }
    };

    return (
        <>
            <BaseNavPage />
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="flex flex-col w-full max-w-md mb-4">
                    <p className="text-3xl font-medium mb-3 text-center">{title}</p>

                    <InputField
                        label="Nome"
                        name="nome"
                        ref={nomePlanoRef}
                        error={errors.nome}
                        defaultValue={plano?.nomePlano || ''}
                    />

                    <InputField
                        label="Valor"
                        name="valor"
                        type="number"
                        step={0.01}
                        ref={valorRef}
                        error={errors.valor}
                        defaultValue={plano?.valor || ''}
                    />

                    <button
                        className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </>
    );
};

import { useParams, useNavigate } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { InputField } from "../../shared/components/InputField";
import { useRef, useState } from "react";
import { AlunoModel } from "../../shared/models/AlunoModel";
import AlunosService from "../../shared/services/AlunosService";


interface FormErrors { nome?: string; email?: string; telefone?: string; plano?: string }

export const AlunoForm = () => {
    let { id } = useParams();
    const title = id? 'Editar aluno' : 'Novo aluno';

    const navigate = useNavigate();

    const nomePlanoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const telefoneRef = useRef<HTMLInputElement>(null);
    const planoRef = useRef<HTMLSelectElement>(null);

    const [errors, setErrors] = useState<FormErrors>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Limpa erros anteriores
        setErrors({});
        setSuccessMessage(null);

        // Obtém valores dos inputs
        const nome = nomePlanoRef.current?.value || '';
        const email = emailRef.current?.value || '';
        const telefone = telefoneRef.current?.value || '';
        const plano = planoRef.current?.value || '';

        let hasErrors = false;
        const newErrors: FormErrors = {};

        // Validação do nome
        if (nome.length < 3) {
            newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Criação do novo plano
        const newAluno: Omit<AlunoModel, 'id'> = {
            nome: nome,
            email: email,
            telefone: telefone,
            plano_id: plano,
        };

        try {
            await AlunosService.create(newAluno);
            setSuccessMessage('Aluno adicionado com sucesso!');
            navigate('/alunos');
        } catch (error) {
            setErrors({ nome: 'Erro ao adicionar o aluno. Tente novamente.' });
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
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        error={errors.email}
                    />

                    <InputField
                        label="Telefone"
                        name="telefone"
                        step={0.01}
                        ref={telefoneRef}
                        error={errors.telefone}
                    />

                    <div className="mb-3">
                        <label htmlFor="plano" className="font-bold text-left block mb-1">Plano</label>
                        <select ref={planoRef} id="plano" className="duration-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-whit">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                        {errors.plano && <p className="text-red-500 text-sm mt-1">{errors.plano}</p>}
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

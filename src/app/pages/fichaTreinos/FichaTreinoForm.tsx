import { useParams, useNavigate } from "react-router-dom";
import { BaseNavPage } from "../../shared/components/BaseNavPage";
import { InputField } from "../../shared/components/InputField";
import { useEffect, useRef, useState } from "react";
import { FichaTreinoModel } from "../../shared/models/FichaTreinoModel";
import FichasTreinoService from "../../shared/services/FichasTreinoService";

interface FormErrors { data?: string; descricao?: string }

interface IExercicioInput {
    id: number;
    name: string;
    value: string;
}

export const FichaTreinoForm = () => {
    let { id } = useParams();

    const [errors, setErrors] = useState<FormErrors>({})

    const navigate = useNavigate();

    const dataRef = useRef<HTMLInputElement>(null);

    const [fichaTreino, setFichaTreino] = useState<FichaTreinoModel>()

    const fetchData = async () => {
        setFichaTreino(await FichasTreinoService.getById(id || ''))
    }
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        setExercicioInputs(fichaTreino?.exercicios ? fichaTreino.exercicios.map(
            (exercicio, index) => ({
                id: index,
                name: `input_${index}`,
                value: exercicio,
            })
        ) : []);
    }, [fichaTreino]);


    const title = id === 'add' ? 'Nova ficha de treino' : 'Editar ficha de treino';

    const [exercicioInputs, setExercicioInputs] = useState<IExercicioInput[]>([]);

    const handleAddInput = () => {
        const newId = Date.now();
        setExercicioInputs([...exercicioInputs, { id: newId, name: `input_${newId}`, value: '' }]);
    };

    const handleRemoveInput = (id: number) => {
        setExercicioInputs(exercicioInputs.filter(input => input.id !== id));
    };

    const handleInputChange = (id: number, newValue: string) => {
        const updatedInputs = exercicioInputs.map(input =>
            input.id === id ? { ...input, value: newValue } : input
        );
        setExercicioInputs(updatedInputs);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrors({});

        const data = dataRef.current?.value || '';
        const exerciciosList = exercicioInputs.map(exercicio => exercicio.value);

        let hasErrors = false;
        const newErrors: FormErrors = {};

        if (!data) {
            newErrors.data = 'A data é obrigatória.'
            hasErrors = true
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        const FichaTreino: Omit<FichaTreinoModel, 'id'> = {
            data: data,
            exercicios: exerciciosList,
        };

        if (!id) {
            try {
                await FichasTreinoService.create(FichaTreino);
                navigate('/fichas-treino');
            } catch (error) {
                setErrors({ data: 'Erro ao adicionar o plano. Tente novamente.' });
            }
        } else {
            try {
                await FichasTreinoService.update(id, FichaTreino);
                navigate('/fichas-treino');
            }
            catch {
                setErrors({ data: 'Erro ao editar a ficha de treino. Tente novamente.' });
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
                        label="Data"
                        name="data"
                        type="datetime-local"
                        ref={dataRef}
                        error={errors?.data}
                        defaultValue={(() => {
                            if (!fichaTreino?.data) {
                                return '';
                            }
                            const date = new Date(fichaTreino.data);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            return `${year}-${month}-${day}T${hours}:${minutes}`;
                        })()}
                    />

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="font-bold text-left block mb-1">Exercícios</label>
                            <button
                                onClick={handleAddInput}
                                className="bg-teal-400 hover:bg-teal-500 duration-100 text-white px-4 py-2 rounded-lg font-bold"
                            >
                                Adicionar Exercício
                            </button>
                        </div>
                        <div>
                            {exercicioInputs.map((input) => (
                                <div key={input.id} className="flex items-center mb-3">
                                    <div className="flex-1">
                                        <InputField
                                            name={input.name}
                                            defaultValue={input.value}
                                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleRemoveInput(input.id)}
                                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg mb-2 font-extrabold"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

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

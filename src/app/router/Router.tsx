import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { PlanosList } from '../pages/planos/PlanosList';
import { PlanoForm } from '../pages/planos/PlanoForm';


export const ApplicationRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="planos" element={<PlanosList />} />
                <Route path="planos/novo" element={<PlanoForm />} />
                <Route path="planos/:id" element={<PlanoForm />} />
                {/*<Route path="alunos" element={<AlunosList />} />
                <Route path="alunos/novo" element={<AlunoForm />} />
                <Route path="alunos/:id" element={<AlunoForm />} />
                
                <Route path="fichas-treino" element={<FichasTreinoList />} />
                <Route path="fichas-treino/novo" element={<FichaTreinoForm />} />
                <Route path="fichas-treino/:id" element={<FichaTreinoForm />} />
                
                
                
                */}
                
                {/* Redireciona para a página inicial para rotas desconhecidas */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

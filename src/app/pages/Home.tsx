import React from 'react';
import user from '../shared/assets/user.svg';
import money from '../shared/assets/money.svg'
import dumbell from '../shared/assets/dumbell.svg'
import { Link } from 'react-router-dom';


interface CardProps {
    to: string;
    title: String;
    svg: string;
}


const HomeLink: React.FC<CardProps> = ({ to, title, svg }) => {
    return (
        <Link to={to} className="flex justify-center items-center relative w-80 h-40 bg-green-400 rounded-3xl overflow-hidden cursor-pointer">
            <div className="absolute inset-0 flex space-x-4 justify-center items-center transition-transform duration-150 hover:scale-125">
                <p className="text-5xl font-bold">{title}</p>

                <img width="50px" src={svg} alt="" />
            </div>
        </Link>
    );
};


export const HomePage = () => {
    return (
        <div className="pt-6">
            <p className="text-6xl text-center font-bold  mb-10">HOME</p>
            <div className='flex flex-col items-center space-y-10'>
                <HomeLink to="/planos" title="Planos" svg={money} />
                <HomeLink to="/alunos" title="Alunos" svg={user} />
                <HomeLink to="/fichas-treino" title="Treinos" svg={dumbell} />
            </div>
        </div>

    )
}
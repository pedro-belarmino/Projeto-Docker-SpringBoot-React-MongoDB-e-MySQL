import axios from "axios"
import { useEffect, useState } from "react"

export default function UserList() {

    const [lista, setLista] = useState<any[]>([])

    useEffect(() => {
        const getAlunos = async () => {
            try {
                const response = await axios.get('http://localhost:8081/alunos')
                const responseData = response.data

                setLista(responseData)
                console.log(responseData)
            } catch {
                console.log('deu erro resórvi ai')
            }
        }
        getAlunos()
    }, [])

    return (
        <>
            <div className="p-10">
                <div className="flex justify-between text-2xl bg-gray-800 p-3 rounded-xl">
                    <p>Lista de aluno!</p>
                    <img src="src/assets/pepe.png" alt="" className="w-10" />
                </div>
                <table className="w-11/12 place-self-center m-5 bg-gray-700 border border-white">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="border p-2">NOME</th>
                            <th className="border p-2">TELEFONE</th>
                            <th className="border p-2">EMAIL</th>
                            <th className="border p-2">ENDEREÇO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="border" id={item.nome}>{item.nome}</td>
                                <td className="border" id={item.telefone}>{item.telefone}</td>
                                <td className="border" id={item.email}>{item.email}</td>
                                <td className="border" id={item.endereco}>{item.endereco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}
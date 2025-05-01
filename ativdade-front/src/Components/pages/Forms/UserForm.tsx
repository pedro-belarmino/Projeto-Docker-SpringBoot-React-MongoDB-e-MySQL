import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useState, useEffect } from "react"

interface alunoType {
    nome: string
    telefone: string
}

const initialAluno: alunoType = {
    nome: '',
    telefone: '',

}

const FIELD_LIMITS = {
    nome: 100,
    telefone: 15,
    email: 100,
    endereco: 200
}

export default function UserForm() {
    const [aluno, setAluno] = useState<alunoType>(initialAluno)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [successSnackbar, setSuccessSnackbar] = useState(false)
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')
    const [characterCount, setCharacterCount] = useState({
        nome: 0,
        telefone: 0,
    })

    useEffect(() => {
        setCharacterCount({
            nome: aluno.nome.length,
            telefone: aluno.telefone.length,
        })
    }, [aluno])

    const handleClose = () => {
        setErrorSnackbar(false)
        setSuccessSnackbar(false)
    }

    const formatPhone = (value: string): string => {
        const cleaned = value.replace(/\D/g, '')

        if (cleaned.length <= 2) {
            return cleaned
        }
        if (cleaned.length <= 6) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
        }
        if (cleaned.length <= 10) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
        }
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        let processedValue = value
        if (name === 'telefone') {
            processedValue = formatPhone(value)
        }

        if (processedValue.length > FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]) {
            return
        }

        setAluno(prevState => ({
            ...prevState,
            [name]: processedValue
        }));
    };

    const validateFields = () => {
        if (!aluno.nome.trim()) {
            setErrorSnackbarMessage('Preencha o campo nome')
            setErrorSnackbar(true)
            return false
        }

        if (!aluno.telefone.trim()) {
            setErrorSnackbarMessage('Preencha o campo telefone')
            setErrorSnackbar(true)
            return false
        }

        if (aluno.telefone.replace(/\D/g, '').length < 10) {
            setErrorSnackbarMessage('Telefone inválido')
            setErrorSnackbar(true)
            return false
        }


        return true
    }

    const save = async () => {
        if (!validateFields()) return
        post1()
        post2()
    }

    const post1 = async () => {
        try {
            const response = await axios.post('http://localhost:8081', aluno)
            console.log(response.data)
            setAluno(initialAluno)
            setSuccessSnackbar(true)
        } catch (error) {
            console.log(error)
            setErrorSnackbarMessage('Erro ao salvar aluno')
            setErrorSnackbar(true)
        }
    }
    const post2 = async () => {
        try {
            const response = await axios.post('http://localhost:8082', aluno)
            console.log(response.data)
            setAluno(initialAluno)
            setSuccessSnackbar(true)
        } catch (error) {
            console.log(error)
            setErrorSnackbarMessage('Erro ao salvar aluno')
            setErrorSnackbar(true)
        }
    }


    return (
        <div className="flex space-x-10 divide-x-2 divide">
            <div>
                <p className="flex justify-between text-2xl bg-gray-800 p-3 m-3 rounded-xl">Cadatro de aluno!</p>
            </div>
            <div className="flex flex-col bg-gray-800 p-7 rounded-xl space-y-2">
                <div>
                    <TextField
                        name="nome"
                        onChange={handleInput}
                        label="Nome"
                        variant="outlined"
                        value={aluno.nome}
                        fullWidth
                        helperText={`${characterCount.nome}/${FIELD_LIMITS.nome}`}
                    />
                </div>
                <div>
                    <TextField
                        name="telefone"
                        onChange={handleInput}
                        label="Telefone"
                        variant="outlined"
                        value={aluno.telefone}
                        fullWidth
                        placeholder="(XX) XXXXX-XXXX"
                        helperText={`${characterCount.telefone}/${FIELD_LIMITS.telefone}`}
                    />
                </div>
                <div className="place-self-center">
                    <Button variant="contained" onClick={save}>Salvar</Button>
                </div>
            </div>
            <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorSnackbarMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={successSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Cadastro Feito com Sucesso
                </Alert>
            </Snackbar>
        </div>
    )
}
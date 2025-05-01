import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="p-4 w-screen flex justify-between bg-gray-800">
            <div>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button onClick={() => navigate('/form')}>Cadastrar</Button>
                    <Button onClick={() => navigate('/list')}>Lista</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
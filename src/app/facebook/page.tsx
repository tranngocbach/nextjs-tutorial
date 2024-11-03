'use client'

import { Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";

const FacebookPage = () => {
    const router = useRouter()

    const handleBtn = () => {
        router.push("/")
    }
    return (
        <div>Facebook page
            <div>
                <Button variant='danger'>Hoi Dan IT</Button>
                <button onClick={() => handleBtn()}>Back</button>
            </div>
        </div>
    );
}

export default FacebookPage;
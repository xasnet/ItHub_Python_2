import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setAuthorization } from '@/shared/services/AuthorizeService';
import { STORAGE } from '@/shared/services/StorageService';

export default function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        STORAGE.clear();
        setAuthorization(false);
        navigate('/login');
    }, []);

    return null;
}

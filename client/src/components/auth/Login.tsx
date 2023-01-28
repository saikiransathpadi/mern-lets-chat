import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react';
import { get } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSessionStorage } from '../../common/utils';
import { securityService } from '../../service/securityService';

export const Login = (props: any) => {
    const navigate = useNavigate()
    const toast = useToast();
    const [formData, setFormData] = useState<any>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const isValidForm = () => {
        const errorFormData = { ...formErrors };
        if (!formData.email) {
            errorFormData.email = true;
        } else errorFormData.email = false;

        if (!formData.password) {
            errorFormData.password = true;
        } else errorFormData.password = false;

        setFormErrors({ ...errorFormData });
        console.log(errorFormData);
        return !Object.keys(errorFormData).filter((i) => errorFormData[i]).length;
    };
    const handleLogin = async () => {
        if (!isValidForm()) return;
        try {
            setLoading(true)
            const resp: any = await securityService.userLogin(formData);
            setLoading(false)
            if (resp.status !== 200) {
                toast({
                    position: 'top',
                    title: get(resp, 'response.data.message', 'Something went Wrong'),
                    status: 'error',
                });
            } else {
                setUserSessionStorage(resp.data.result)
                navigate('/chats')
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <VStack spacing='5px'>
            <FormControl isRequired isInvalid={formErrors.email}>
                <FormLabel ml={'3px'}>Email</FormLabel>
                <Input type='email' placeholder='Enter Email...' name='email' onChange={handleChange} value={formData.email} required />
            </FormControl>
            <FormControl isRequired isInvalid={formErrors.password}>
                <FormLabel ml={'3px'}>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        placeholder='Enter Password...'
                        name='password'
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    <InputRightElement w={'4.5rem'}>
                        <Button height='1.75rem' size='sm' bg='none' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme='blue' style={{ marginTop: 15 }} w='100%' onClick={handleLogin} isLoading={loading}>
                Login
            </Button>
            <Text fontSize={'sm'} display='flex'>
                Don't have an account ?
                <Button
                    height='1.35rem'
                    size='sm'
                    color={'blue'}
                    bg={'white'}
                    _hover={{ bg: 'white' }}
                    onClick={() => {
                        props.handleTabChange(1);
                    }}
                >
                    Sign Up
                </Button>
            </Text>
        </VStack>
    );
};

import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { get } from 'lodash';
import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../../common/utils';
import { securityService } from '../../service/securityService';
import { CloudinaryImageUpload } from '../common/CloudinaryImageUpload';

interface ISignUp {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    profilePic?: string;
}

const getFormDefaults = () => ({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
});

export const SignUp = (props: any) => {
    const toast = useToast();
    const [formData, setFormData] = useState<ISignUp>(getFormDefaults());
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: any }>({});

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const isValidForm = () => {
        const errorFormData = { ...formErrors };
        if (!isValidEmail(formData.email)) {
            errorFormData.email = 'Email should be in the format of {user}@{mailType}.{domain}';
        } else errorFormData.email = null;

        if (!isValidPassword(formData.password)) {
            errorFormData.password = 'Password should have minimum eight characters, at least one letter and one number';
        } else errorFormData.password = null;

        if (!formData.name) {
            errorFormData.name = true;
        } else errorFormData.name = null;

        if (formData.password !== formData.confirmPassword) {
            errorFormData.confirmPassword = 'Password didnt match';
        } else errorFormData.confirmPassword = null;

        setFormErrors({ ...errorFormData });
        return !Object.keys(errorFormData).filter((i) => errorFormData[i]).length;
    };

    const handleSignUp = async () => {
        if (!isValidForm()) return;
        try {
            setLoading(true)
            const resp: any = await securityService.userSignUp(formData);
            setLoading(false)
            if (resp.status === 200) {
                toast({
                    position: 'top',
                    title: 'Account Created Successfully',
                    status: 'success',
                });
                props.handleTabChange(0);
            } else {
                toast({
                    position: 'top',
                    title: get(resp, 'response.data.message', "Something went Wrong"),
                    status: 'error',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <VStack spacing='5px'>
            <FormControl isRequired isInvalid={Boolean(formErrors.name)}>
                <FormLabel ml={'3px'}>Name</FormLabel>
                <Input placeholder='Enter Name...' id='name' onChange={handleChange} value={formData.name} required />
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(formErrors.email)}>
                <FormLabel ml={'3px'}>Email</FormLabel>
                <Input type='email' placeholder='Enter Email...' id='email' onChange={handleChange} value={formData.email} required />
                <FormHelperText>{formErrors.email}</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(formErrors.password)}>
                <FormLabel ml={'3px'}>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        placeholder='Enter Password...'
                        id='password'
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
                <FormHelperText>{formErrors.password}</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(formErrors.confirmPassword)}>
                <FormLabel ml={'3px'}>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        placeholder='Enter Password Again...'
                        id='confirmPassword'
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                    />
                    <InputRightElement w={'4.5rem'}>
                        <Button height='1.75rem' size='sm' bg='none' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
            </FormControl>
            <CloudinaryImageUpload
                handleChange={(profilePic: string) => setFormData({ ...formData, profilePic })}
                handleLoading={(flag: boolean) => setLoading(flag)}
            />

            <Button colorScheme='blue' style={{ marginTop: 15 }} w='100%' onClick={handleSignUp} isLoading={loading}>
                Sign Up
            </Button>
            <Text fontSize={'sm'} display='flex'>
                Already have an account ?
                <Button
                    height='1.35rem'
                    size='sm'
                    color={'blue'}
                    bg={'white'}
                    _hover={{ bg: 'white' }}
                    onClick={() => {
                        props.handleTabChange(0);
                    }}
                >
                    Login
                </Button>
            </Text>
        </VStack>
    );
};

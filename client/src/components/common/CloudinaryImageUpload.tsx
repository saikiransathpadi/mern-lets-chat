import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ApiRequest } from '../../common/apiRequest';

export const CloudinaryImageUpload = ({ handleChange, handleLoading }: any) => {
    const handleUploadImage = async (event: any) => {
        if (!event.target.files[0]) {
            handleChange(undefined);
            return;
        }
        const data = new FormData();
        data.append('file', event.target.files[0]);
        console.log(event.target.files);
        data.append('upload_preset', 'lets_chat_saki');
        data.append('cloud_name', 'ddschaq8d');
        handleLoading(true);
        const resp: any = await ApiRequest({
            url: 'https://api.cloudinary.com/v1_1/ddschaq8d/image/upload',
            method: 'post',
            data,
        });
        handleChange(resp.data.url);
        handleLoading(false);
    };
    return (
        <FormControl>
            <FormLabel ml={'3px'}>Upload Profile Pic</FormLabel>
            <Input
                type='file'
                p={'1.5'}
                accept='image/*'
                id='pic'
                onChange={handleUploadImage}
                required
                border={'none'}
                value={undefined}
            />
        </FormControl>
    );
};

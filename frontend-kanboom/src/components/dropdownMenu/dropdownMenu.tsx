import { useAuth } from '@/context/authContext';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

function DropdownMenu() {
  const { setModalEditUser, setOpenMenu } = useAuth();
  const router = useRouter();
  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/')
  }
  return (
    <div className="flex flex-col absolute bg-white mt-[50px] border border-black">
      <NextLink href={'/dashboard'} className='p-[4px]' onClick={()=> setOpenMenu(false)}>Página inicial</NextLink>
      <button className="border-top-black p-[4px]" onClick={() => {setModalEditUser(true)
      setOpenMenu(false)}}>Editar Perfil</button>
      <button className="border-top-black p-[4px]" onClick={()=> logout()}>Sair</button>
    </div>
  );
}

export default DropdownMenu;

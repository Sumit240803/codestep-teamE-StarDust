import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { ModalHeader, ModalTitle, ModalCloseBtn, ModalBody } from "../../../ui/Modal/utils";
import { useAuth } from "../../../../hooks/useAuth";
import './index.css';
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../../../hooks/useQueryParams";

const Wallets : WalletType[] = [
    // {
    //     icon:'/assets/images/wallets/nfid.png',
    //     name:'NFID',
    //     method:'ii'
    // },
    // {
    //     icon:'/assets/images/wallets/bifinity.png',
    //     name:'BIFINITY',
    //     method:'ii'
    // },
    {
        icon:'/assets/images/wallets/plug.png',
        name:'PLUG',
        method:'plug'
    },
    {
        icon:'/assets/images/wallets/ii.png',
        name:'INTERNETIDENTITY',
        method:'ii'
    }
]

export default function ConnectWallet({closeModal} : {closeModal:()=>void}) {
    const auth = useAuth();
    const navigate = useNavigate()
    const ref_id = useQueryParams().get('ref');
    // Temporary Function : Register User on Successfull Login
    const handleLogin = async (method: "ii" | "plug") => {
        if (!auth) {
            throw new Error("Auth not initialized");
        }

        let targetPath = ""
    
        try {
            const actor = await auth.login(method);
            if(actor) {
                const response : any = await actor.getUser();
                if(ref_id){
                    targetPath = response.ok ? 'dashboard' : `register?ref=${ref_id}`;
                } else {
                    targetPath = response.ok ? 'dashboard' : 'register';
                }
            }
            
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            closeModal();
            navigate(targetPath, {replace:true});
        }
    };
    

    return (
        <Modal onClose={closeModal}>
            
            <ModalHeader>
                <div className="wallet-header">
                <ModalTitle>Connect Wallet</ModalTitle>
                <ModalCloseBtn/>

                </div>
            </ModalHeader>
            
            <ModalBody>
                <div className="button-container">
                    {
                        Wallets.map(wallet => (
                            <Button variant="secondary" key={wallet.name} className="wallet-button" onClick={()=>handleLogin(wallet.method)}>
                                <div className="wallet-button-container">
                                    <span>{wallet.name}</span>
                                    <img src={wallet.icon} alt={wallet.name} loading='lazy' width={40} height={40} className="wallet-icon"/>
                                </div>
                            </Button>
                        ))
                    }
                </div>
            </ModalBody>
        </Modal>
    )
}
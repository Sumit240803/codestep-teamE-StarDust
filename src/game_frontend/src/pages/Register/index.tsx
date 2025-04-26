import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './index.css';
import useRegister from '../../hooks/useRegister';

const RegisterScreen = () => {
  const { playerName, handleSubmit, onChange, isLoading } = useRegister();

  return (
    <div
      className="game-container "
      style={{
        backgroundImage: 'url("/Firefly-bg.webp")',
        backgroundSize: "cover",
      }}
    >
      <div className="game-content">
        <h1 className="game-title">Enter your Name</h1>

        <form onSubmit={handleSubmit} className="game-form">
          <div className="input-wrapper">
            <Input>
              <input
                type="text"
                value={playerName}
                onChange={onChange}
                className="game-input"
              />
            </Input>
          </div>

          <div className="button-wrapper">
            <Button type="submit" disabled={isLoading} aria-disabled={isLoading} className="button-text"
            >
              Let's Play
              
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;

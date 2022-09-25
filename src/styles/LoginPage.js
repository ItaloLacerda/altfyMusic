import {
  Button, Paper, styled,
} from '@mui/material';
import background from '../image/background.png';

export const styleBackgroundLongin = {
  paperContainer: {
    backgroundImage: `url(${background})`,
    width: '100%',
    height: '54.43em',
    borderRadius: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linkContainer: {
    color: '#2D1E80',
  },

  boxContainer: {
    marginTop: '2em',
  },

  passwordContainer: {
    marginTop: '1em',
  },

  checkboxContainer: {
    marginTop: '1em',
  },

  body1Container: {
    marginTop: '1em',
  },

  buttonContainer: {
    marginTop: '2em',
    padding: '1em',
  },

};

export const CustonPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33.85em;
    height: 42.8em;
    border-radius: 125px;

`;

export const CustonForm = styled('form')`
    display: flex;
    flex-direction: column;
    margin-top: 6.1em;
`;

export const CustonButton = styled(Button)`
    background: linear-gradient(180deg, #5A189A 0%, #001247 100%);
    color: #FFFFFF;
`;

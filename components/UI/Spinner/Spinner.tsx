import classes from './Spinner.module.css';

export default function Spinner() {
  // console.log('SPINNER RENDER::::');
  return (
    <div className={classes.SpinnerOverlay}>
      <div className={classes.Spinner}></div>
      <div className={classes.SpinnerText}>Please Wait...</div>
    </div>
  );
}

import React from 'react'
import s from './LoginForm.module.css'
import { Field, reduxForm } from "redux-form";
import { required } from "../../validators/validators";
import { useState } from "react";
import { Input, CheckBoxLogin } from "../Common/FormControl/FormControl";

export const LoginForm = (props) => {
   const [checked, editChecked] = useState(false)
   const [classChecked, editClassChecked] = useState(`${s.login__checkbox}`)
   const checkedSuccess = () => {
      editChecked(true)
      editClassChecked(`${s.login__checkbox} ${s.checkbox__active}`)
   }
   const checkedFailure = () => {
      editChecked(false)
      editClassChecked(`${s.login__checkbox}`)
   }
   return (
      <form className={s.login__form} onSubmit={props.handleSubmit}>
         <div className={s.login__item}><Field className={s.login__input} component={Input} type={'input'} name={'email'} validate={required} /></div>
         <div className={s.login__item}><Field className={s.login__input} component={Input} type={'password'} name={'password'} validate={required} /></div>
         {!checked
            ? <div onClick={(e) => checkedSuccess()} className={classChecked}>
               <Field component={CheckBoxLogin} className={s.checkboxLogin__checkbox} type={'checkbox'} name={'rememberMe'} validate={required} checked={checked} />
               <span>Remember me</span>
            </div>
            : <div onClick={(e) => checkedFailure()} className={classChecked}>
               <Field component={CheckBoxLogin} className={s.checkboxLogin__checkbox} type={'checkbox'} name={'rememberMe'} checked={checked} />
               <span>Remember me</span>
            </div>
         }
         <div>
            {props.isCaptcha && <img className={s.login__captcha} src={props.urlCaptcha} />}
            {props.isCaptcha && <div className={s.login__item}><Field className={s.login__input} component={'input'} type={'input'} name={'captcha'} /></div>}
         </div>
         <button className={s.login__button} type={'submit'}>To come in</button>
      </form>
   )
}
export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
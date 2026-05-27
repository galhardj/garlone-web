"use client";

import styles from "./Contact.module.css";
import type { Form } from "@/src/type/forms";
import ContainerMapper from "./mapper/ContainerMapper";

const Form = ({ title, description, containers, buttonText }: Form) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.clear();
  };

  return (
    <section className={styles["form-section"]}>
      <h2>{title}</h2>
      <p>{description}</p>
      <form onSubmit={submitHandler} className={styles.form}>
        <ContainerMapper containers={containers} />
        <button type="submit">{buttonText}</button>
      </form>
    </section>
  );
};

export default Form;

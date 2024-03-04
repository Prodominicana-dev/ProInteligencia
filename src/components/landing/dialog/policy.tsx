"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PolicyDialog({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  return (
    <Dialog
      open={open}
      size="lg"
      handler={handleOpen}
      className="flex justify-center h-[90vh] w-full py-10 bg-white overflow-auto no-scrollbar text-black"
    >
      <DialogBody className="flex flex-col w-11/12 gap-10 py-10 text-black">
        <h1 className="text-3xl text-black font-custom">
          Política de Privacidad
        </h1>
        <div className="flex flex-col gap-2 text-lg text-black font-montserrat">
          <p>
            Bienvenido a ProInteligencia. En ProInteligencia ("ProInteligencia"
            o " nosotros"), reconocemos la importancia de la privacidad de los
            usuarios y nos esforzamos por asegurar un manejo transparente y
            seguro de la información recopilada. Esta Política de Privacidad
            detalla nuestras prácticas en la recopilación de datos y describe
            los derechos de los usuarios con respecto a sus datos personales.
          </p>
          <p>
            Esta Política de Privacidad se aplica durante su visita o
            utilización de nuestro sitio web u otros servicios relacionados
            (conjuntamente denominados los "Servicios"). Asimismo, se extiende a
            posibles usuarios y clientes de nuestros productos y servicios.
          </p>
          <p>
            Al utilizar nuestros Servicios, usted acepta los términos de nuestra
            Política de Privacidad. Le recomendamos no utilizar los Servicios si
            no está de acuerdo con esta política. Su conformidad con estos
            términos es esencial para garantizar una experiencia segura y
            respetuosa de su privacidad en ProInteligencia.
          </p>
        </div>
        <ol className="flex flex-col w-full gap-5 list-decimal list-inside">
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Descripción del Tratamiento de la Información Personal
            </li>
            <p className="text-lg text-black font-montserrat">
              ProInteligencia, en su portal web{" "}
              <span className="font-bold">
                prointeligencia.prodominicana.gob.do
              </span>
              , manifiesta su compromiso con el respeto a la privacidad de los
              usuarios y la salvaguarda de la información recogida. Aseguramos
              un tratamiento responsable y seguro de los datos personales, de
              acuerdo con lo establecido en la ley 172-13 sobre protección
              integral de datos personales y normativas vigentes en materia de
              privacidad.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Recopilación de Datos
            </li>
            <p className="text-lg text-black font-montserrat">
              Durante el proceso de registro en ProInteligencia, es esencial
              recopilar información personal de los usuarios. Esta medida
              resulta fundamental para facilitar el acceso a estadísticas de
              comercio internacional e inversión extranjera directa, y
              proporcionar detalles sobre los requisitos para exportar productos
              a diversos destinos internacionales. Los datos recopilados pueden
              incluir información como nombres y direcciones de correo
              electrónico. Este procedimiento se lleva a cabo con la máxima
              consideración por la privacidad y se ejecuta en conformidad con
              los principios legales y normativas aplicables.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Uso de la Información
            </li>
            <p className="text-lg text-black font-montserrat">
              La información recopilada desempeña un papel fundamental en la
              facilitación del acceso a estadísticas de comercio internacional e
              inversión extranjera directa, y en la provisión de detalles
              esenciales sobre los requisitos para la exportación. Además,
              habilita el funcionamiento del sistema de alertas integrado.
              Internamente, ProInteligencia utiliza estos datos con el propósito
              exclusivo de elevar la calidad y eficacia de los servicios que
              ofrecemos, perpetuando nuestro compromiso con la excelencia
              operativa y la mejora continua.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Almacenamiento y Seguridad
            </li>
            <p className="text-lg text-black font-montserrat">
              La información personal recopilada se resguarda con meticulosidad
              en servidores altamente seguros. Implementamos medidas de
              seguridad rigurosas para prevenir accesos no autorizados,
              alteraciones o divulgación indebida de los datos. Este enfoque en
              la seguridad informática se traduce en un compromiso sólido con la
              protección integral de la información confiada a ProInteligencia,
              garantizando la confidencialidad y la integridad de los datos
              almacenados.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Cookies y Tecnologías Similares
            </li>
            <p className="text-lg text-black font-montserrat">
              En ProInteligencia, empleamos cookies y tecnologías afines con el
              objetivo de optimizar la experiencia del usuario. Las cookies son
              pequeños archivos de datos que se almacenan en su dispositivo y
              facilitan la personalización de su interacción con nuestra
              plataforma. Las cookies nos permiten adaptar nuestros servicios a
              sus preferencias individuales. Los usuarios pueden gestionar sus
              preferencias de cookies con la configuración de su navegador,
              brindándoles un control total sobre su experiencia de navegación
              en ProInteligencia.
            </p>
            <p className="text-lg text-black font-montserrat">
              Este enfoque garantiza una experiencia personalizada y adaptada a
              las preferencias individuales de cada usuario.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Terceros y Compartir Información
            </li>
            <p className="text-lg text-black font-montserrat">
              ProInteligencia se reserva el derecho de compartir información con
              terceros en situaciones debidamente autorizadas por las
              disposiciones aplicables o cuando sea necesario para cumplir con
              los objetivos delineados en esta política de privacidad. Es
              importante destacar que en ningún caso se compartirá información
              con terceros para propósitos comerciales.
            </p>
            <p className="text-lg text-black font-montserrat">
              Nuestro compromiso inquebrantable con la confidencialidad y la
              protección de la privacidad de nuestros usuarios impulsa cada
              decisión relacionada con el intercambio de información con
              terceros, asegurando un enfoque responsable y ético en todo
              momento.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Derechos y Opciones del Usuario
            </li>
            <p className="text-lg text-black font-montserrat">
              En ProInteligencia, reconocemos la importancia de la autonomía y
              la privacidad de nuestros usuarios. Por ello, garantizamos a cada
              usuario el derecho de acceder, corregir o eliminar su información
              personal. Para ejercer estos derechos, los usuarios pueden ponerse
              en contacto con ProInteligencia a través de la información de
              contacto proporcionada en esta política. Este compromiso refleja
              nuestro enfoque centrado en el usuario y nuestra disposición a
              atender las necesidades individuales con máxima diligencia y
              respeto por la privacidad.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Menores de Edad
            </li>
            <p className="text-lg text-black font-montserrat">
              En ProInteligencia, reiteramos nuestra política de no recopilar
              intencionalmente información de menores de edad sin el
              consentimiento verificable de sus padres o tutores legales. Este
              compromiso refleja nuestra dedicación inquebrantable a la
              protección de la privacidad de los menores y nuestro apego a los
              más altos estándares éticos en la gestión de datos.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Cambios en las Políticas
            </li>
            <p className="text-lg text-black font-montserrat">
              ProInteligencia se reserva el derecho de actualizar estas
              políticas en cualquier momento con el objetivo de mantener la
              transparencia y la conformidad con las leyes y regulaciones
              aplicables. Las futuras actualizaciones de estas políticas serán
              notificadas por correo electrónico.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Cumplimiento Legal
            </li>
            <p className="text-lg text-black font-montserrat">
              En ProInteligencia, nos comprometemos de manera inquebrantable a
              cumplir con la ley 172-13, cuyo objetivo es la protección integral
              de los datos personales y regulaciones de privacidad aplicables.
              Este compromiso es fundamental para mantener la confianza de
              nuestros usuarios y garantizar que todas nuestras prácticas estén
              alineadas con los más altos estándares legales en materia de
              privacidad y protección de datos.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Contacto
            </li>
            <p className="text-lg text-black font-montserrat">
              Si tiene alguna pregunta sobre esta Política de Privacidad, no
              dude en ponerse en contacto con nosotros a través de los
              siguientes canales:
            </p>
            <div className="font-montserrat">
              <strong>Vía correo electrónico:</strong>{" "}
              <p className="font-bold">servicios@prodominicana.gob.do</p>
            </div>
            <div className="font-montserrat">
              <strong>Vía telefónica:</strong>
              <p className="font-bold">(809) 530-5505</p>
            </div>
            <p className="pb-10 text-lg text-black font-montserrat">
              Estamos aquí para atender sus consultas y colaborar de manera
              efectiva.
            </p>
          </div>
        </ol>
      </DialogBody>
    </Dialog>
  );
}

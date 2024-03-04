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

export default function TermsDialog({
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
      className="flex justify-center h-[90vh] w-full py-10 bg-white text-black"
    >
      <DialogBody className="flex flex-col w-11/12 gap-10 py-10 overflow-auto text-black no-scrollbar">
        <h1 className="text-3xl text-black font-custom">Términos de Uso</h1>
        <div className="flex flex-col gap-2 text-lg text-black font-montserrat">
          <p>
            Bienvenido a ProInteligencia, la plataforma en línea proporcionada
            por el Centro de Exportación e Inversión de la República Dominicana
            (ProDominicana). Los presentes términos de uso rigen el acceso y la
            utilización de los servicios ofrecidos a través del portal{" "}
            <span className="font-semibold">
              prointeligencia.prodominicana.gob.do
            </span>{" "}
            (en adelante, "ProInteligencia").
          </p>
          <p>
            Al acceder y utilizar ProInteligencia, los usuarios manifiestan su
            pleno acuerdo con los términos de uso establecidos aquí, asegurando
            así una experiencia informada y en conformidad con nuestras
            políticas. Este compromiso impulsa las exportaciones y respalda la
            atracción de inversión extranjera directa, contribuyendo al
            crecimiento económico y al desarrollo sostenible de la República
            Dominicana.
          </p>
          <p>
            Dado que estos términos de uso pueden experimentar modificaciones y,
            en caso de actualización, se le enviará un correo electrónico para
            notificarle de los cambios realizados. Su continuo uso del servicio
            después de recibir la notificación constituirá su aceptación de los
            Términos de Uso actualizados.
          </p>
        </div>
        <ol className="flex flex-col w-full gap-5 list-decimal list-inside">
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Descripción del Servicio
            </li>
            <p className="text-lg text-black font-montserrat">
              {" "}
              ProInteligencia, a través de su avanzada plataforma en línea en{" "}
              <span className="font-semibold">
                prointeligencia.prodominicana.gob.do
              </span>
              , ofrece un servicio integral en datos e información sobre
              comercio internacional e inversión extranjera directa (IED), así
              como requisitos para la exportación. ProInteligencia se conforma
              por herramientas especializadas como Acceso a Mercados, diseñada
              para poner a disposición del usuario los requisitos para exportar;
              Alertas Comerciales, que mantiene a los exportadores informados
              sobre oportunidades y desafíos en el comercio internacional; Data
              Market, donde puedes analizar datos y estadísticas de comercio
              internacional e IED; y Alertas de IED, que proporcionan
              información estratégica sobre las últimas novedades de la
              inversión extranjera directa.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Condiciones de Uso
            </li>
            <p className="text-lg text-black font-montserrat">
              La utilización de ProInteligencia se rige por la aceptación y
              riguroso cumplimiento de los presentes términos. Al hacer uso de
              nuestros servicios, los usuarios confirman haber leído,
              comprendido y aceptado de manera íntegra estas condiciones. Se
              advierte que cualquier uso no autorizado o en infracción de estos
              términos podría resultar en la terminación del acceso a nuestros
              servicios, subrayando la importancia de un apego estricto a estas
              normativas para garantizar una experiencia transparente y segura.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Registro y Cuentas de Usuario
            </li>
            <p className="text-lg text-black font-montserrat">
              Al registrarse en ProInteligencia, los usuarios asumen el
              compromiso de suministrar información precisa y actualizada. Se
              les asigna la responsabilidad de preservar la confidencialidad de
              sus credenciales de cuenta, así como de supervisar todas las
              actividades realizadas bajo su cuenta. Este compromiso refleja
              nuestra búsqueda de la más alta integridad y seguridad en la
              gestión de la información, garantizando una experiencia confiable
              y personalizada para cada usuario.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Propiedad Intelectual
            </li>
            <p className="text-lg text-black font-montserrat">
              La totalidad del contenido ofrecido por ProInteligencia, engloba
              textos, gráficos, logotipos, marcas, combinaciones de colores, o
              cualquier otro elemento, y su estructura y diseño, imágenes y
              software, está protegida por las leyes de propiedad intelectual.
              Se prohíbe de manera estricta el uso no autorizado de dicho
              contenido. Este enfoque evidencia nuestro compromiso irrevocable
              con la salvaguarda de la creatividad y la innovación, fomentando
              el respeto a la propiedad intelectual y promoviendo prácticas
              éticas y legales en toda interacción con nuestros servicios.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Limitación de Responsabilidad
            </li>
            <p className="text-lg text-black font-montserrat">
              A pesar de nuestros esfuerzos por ofrecer información precisa,
              ProInteligencia no garantiza la exactitud, integridad o actualidad
              del contenido. No asumimos responsabilidad por pérdidas o daños
              derivados del uso de nuestro servicio. Esta limitación de
              responsabilidad refleja nuestra transparencia y el reconocimiento
              de la naturaleza dinámica de la información, instando a los
              usuarios a tomar decisiones informadas y a entender que el acceso
              y la interpretación de la información están sujetos a su propia
              discreción y responsabilidad.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Enlaces a Terceros
            </li>
            <p className="text-lg text-black font-montserrat">
              ProInteligencia puede facilitar enlaces a sitios web de terceros.
              No ejercemos control sobre el contenido ni las prácticas de
              privacidad de estos sitios y, por ende, declinamos toda
              responsabilidad al respecto. Esta declaración resalta nuestra
              transparencia y la importancia de que los usuarios sean
              conscientes de que, al acceder a enlaces externos, están sujetos a
              las políticas y condiciones propias de esos sitios, independientes
              de ProInteligencia.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Cambios en los Términos
            </li>
            <p className="text-lg text-black font-montserrat">
              ProInteligencia se reserva el derecho de actualizar y modificar
              estos términos de uso en cualquier momento. El uso continuado del
              servicio después de la implementación de dichos cambios se
              considerará como la aceptación de los Términos modificados.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Normativas Legales
            </li>
            <p className="text-lg text-black font-montserrat">
              Al hacer uso de ProInteligencia, aceptas el compromiso de cumplir
              con todas las leyes y regulaciones aplicables. Te comprometes a no
              utilizar nuestro servicio de una manera que infrinja ninguna ley o
              regulación.
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            <li className="text-2xl font-bold text-black font-montserrat">
              Contacto
            </li>
            <p className="text-lg text-black font-montserrat">
              Para sugerencias, propuestas de colaboración o consultas, no dude
              en ponerse en contacto con nosotros a través de los siguientes
              canales:
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

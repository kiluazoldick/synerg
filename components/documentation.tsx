"use client"

import { Users, ShoppingCart, FileText, Package, Truck, BarChart3, Lightbulb } from "lucide-react"
import { colors } from "@/lib/theme"

interface DocumentationModuleProps {
  isDark: boolean
}

export function DocumentationModule({ isDark }: DocumentationModuleProps) {
  const palette = isDark ? colors.dark : colors.light

  const SectionCard = ({ icon: Icon, title, content }: any) => (
    <div
      style={{
        backgroundColor: palette.bg.secondary,
        border: `1px solid ${palette.border}`,
        borderRadius: "12px",
        padding: "24px",
        boxShadow: palette.shadow,
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "18px",
          fontWeight: "600",
          margin: "0 0 16px 0",
          color: palette.text.primary,
        }}
      >
        <Icon size={24} style={{ color: palette.accent.blue }} />
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{content}</div>
    </div>
  )

  const InfoBlock = ({ label, value }: any) => (
    <p style={{ fontSize: "14px", color: palette.text.secondary, margin: "0" }}>
      <strong style={{ color: palette.text.primary }}>{label}:</strong> {value}
    </p>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
          Documentation SynergERP
        </h1>
        <p style={{ fontSize: "15px", color: palette.text.secondary, margin: 0 }}>
          Guide complet d'utilisation de votre système de gestion intégré
        </p>
      </div>

      {/* Welcome */}
      <div
        style={{
          backgroundColor: isDark ? "#0c4a6e" : "#f0f9ff",
          border: `1px solid ${isDark ? "#0284c7" : "#bfdbfe"}`,
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 12px 0", color: palette.accent.blue }}>
          Bienvenue dans SynergERP
        </h2>
        <p style={{ fontSize: "14px", color: palette.text.primary, margin: "0 0 12px 0" }}>
          SynergERP est une solution de gestion intégrée conçue pour les PME. Elle permet de centraliser tous vos
          processus métier en un seul endroit avec une interface simple et intuitive.
        </p>
        <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
          Les données sont sauvegardées localement dans votre navigateur, vous pouvez donc tester librement sans crainte
          de perdre votre configuration.
        </p>
      </div>

      {/* Modules */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SectionCard
          icon={BarChart3}
          title="Tableau de bord"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Vue d'ensemble instantanée de votre activité
              </p>
              <InfoBlock label="Chiffre d'affaires (bleu)" value="Montant total généré par vos ventes et factures" />
              <InfoBlock
                label="Marge totale (teal)"
                value="Profit net après déduction des coûts. Plus c'est élevé, meilleure est votre rentabilité"
              />
              <InfoBlock label="Clients" value="Nombre total de clients enregistrés" />
              <InfoBlock label="Commandes" value="Nombre de commandes en cours ou historique" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0", fontStyle: "italic" }}>
                Les graphiques affichent les tendances mensuelles pour suivre votre évolution.
              </p>
            </div>
          }
        />

        <SectionCard
          icon={Users}
          title="Gestion des clients"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Gérez votre base de clients facilement
              </p>
              <InfoBlock
                label="Ajouter"
                value="Cliquez sur 'Ajouter un client' et remplissez les informations (nom, email, téléphone, entreprise)"
              />
              <InfoBlock label="Modifier" value="Cliquez sur l'icône crayon pour éditer les informations" />
              <InfoBlock label="Supprimer" value="Cliquez sur l'icône corbeille pour supprimer (action irréversible)" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0" }}>
                Les clients sont utilisés comme référence dans les commandes et factures.
              </p>
            </div>
          }
        />

        <SectionCard
          icon={ShoppingCart}
          title="Gestion des commandes"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Suivez vos commandes clients et marges
              </p>
              <InfoBlock
                label="Créer une commande"
                value="Sélectionnez un client, numéro de commande, montant total, marge et statut"
              />
              <InfoBlock label="Montant total" value="Le prix total de la commande (incluant les coûts)" />
              <InfoBlock label="Marge" value="Le profit attendu (montant total - coûts)" />
              <InfoBlock label="% Marge" value="Pourcentage de rentabilité (Marge ÷ Montant total × 100)" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0" }}>
                Vous pouvez éditer ou supprimer les commandes à tout moment.
              </p>
            </div>
          }
        />

        <SectionCard
          icon={FileText}
          title="Gestion des factures"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Gérez votre facturation et suivi de paiement
              </p>
              <InfoBlock
                label="Créer une facture"
                value="Sélectionnez un client, numéro, montants et fixez une date d'échéance"
              />
              <InfoBlock label="Statuts" value="Brouillon (en cours), Envoyée (au client), Payée (reçue)" />
              <InfoBlock label="Suivi des échéances" value="Les dates vous aident à suivre les paiements attendus" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0" }}>
                Les montants impactent le chiffre d'affaires total du tableau de bord.
              </p>
            </div>
          }
        />

        <SectionCard
          icon={Package}
          title="Gestion des stocks"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Suivez votre inventaire de produits
              </p>
              <InfoBlock label="Produits" value="Visualisez tous vos produits avec coûts, prix et quantités" />
              <InfoBlock label="Marge par produit" value="Calculée automatiquement en fonction des prix" />
              <InfoBlock label="Alertes stock" value="Attention rouge si quantité < 50 unités" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0" }}>
                Un bon suivi des stocks évite les ruptures et optimise votre trésorerie.
              </p>
            </div>
          }
        />

        <SectionCard
          icon={Truck}
          title="Gestion des fournisseurs"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                Centralisez vos informations de fournisseurs
              </p>
              <InfoBlock
                label="Ajouter"
                value="Nom, email, téléphone, adresse et catégorie (Matières premières, Équipement, Services, Autres)"
              />
              <InfoBlock label="Catégories" value="Organisez vos fournisseurs par type pour une meilleure gestion" />
              <InfoBlock label="Contact rapide" value="Accédez facilement aux coordonnées pour passer commande" />
              <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "8px 0 0 0" }}>
                Une bonne gestion assure la qualité et la continuité de vos approvisionnements.
              </p>
            </div>
          }
        />
      </div>

      {/* Tips */}
      <div
        style={{
          backgroundColor: isDark ? "#064e3b" : "#f0fdf4",
          border: `1px solid ${isDark ? "#059669" : "#bbf7d0"}`,
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0 0 16px 0",
            color: palette.accent.green,
          }}
        >
          <Lightbulb size={24} />
          Conseils d'utilisation
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          <li style={{ fontSize: "14px", color: palette.text.primary }}>
            <strong>Mise à jour régulière:</strong> Gardez vos données à jour pour des rapports précis
          </li>
          <li style={{ fontSize: "14px", color: palette.text.primary }}>
            <strong>Utilisez les statuts:</strong> Brouillon, En attente, Confirmée pour suivre l'avancement
          </li>
          <li style={{ fontSize: "14px", color: palette.text.primary }}>
            <strong>Consultez le dashboard:</strong> Surveiller votre rentabilité régulièrement
          </li>
          <li style={{ fontSize: "14px", color: palette.text.primary }}>
            <strong>Ratio rentabilité:</strong> Maintenez un bon équilibre entre chiffre d'affaires et marge
          </li>
          <li style={{ fontSize: "14px", color: palette.text.primary }}>
            <strong>Données locales:</strong> Sauvegardez votre historique si nécessaire
          </li>
        </ul>
      </div>
    </div>
  )
}

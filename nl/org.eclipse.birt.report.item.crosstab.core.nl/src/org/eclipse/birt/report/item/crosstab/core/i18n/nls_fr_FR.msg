###########################################################
# Crosstab name conventions
Element.Crosstab=Tableau crois�

Element.CrosstabCell=Cellule du tableau crois�

Element.CrosstabAggregationCell=Cellule d'agr�gation du tableau crois�

Element.AggregationOnRow=Agr�gation � la ligne

Element.AggregationOnColumn=Agr�gation sur la colonne

Element.AggregationHeaderLocation=Emplacement de l'en-t�te d'agr�gation

Element.GrandTotalLocation=Emplacement du total g�n�ral

Element.MeasureView=Affichage de mesure

Element.ComputedMeasureView=Affichage mesure calcul�e

Element.PageBreakBefore=Saut de page avant

Element.PageBreakAfter=Saut de page apr�s

Element.PageBreakInside=Saut de page � l'int�rieur

Element.PageBreakInterval=Intervalle de saut de page

Element.SortDirection=Direction du tri

Element.SortType=Type de tri

Element.LevelView=Affichage de niveau

Element.DisplayField=Afficher le champ

Element.DimensionView=Affichage de dimension

Element.CrosstabView=Affichage du tableau crois�

Element.Cube=Cube
Element.Dimension=Dimension

Element.Level=Niveau

Element.Measure=Mesure

Element.Caption=L�gende

Element.CaptionID=Cl� de l�gende

Element.Summary=R�sum�

Element.MeasureDirection=Direction de la mesure

Element.PageLayout=Mise en page

Element.EmptyCellValue=Valeur de cellule vide

Element.RepeatRowHeader=R�p�ter l'en-t�te de ligne

Element.RepeatColumnHeader=R�p�ter l'en-t�te de colonne

Element.Mirrored=En miroir

Element.MirrorStartingLevel=Niveau de d�part de la mise en miroir

Element.HideMeasureHeader=Masquer l'en-t�te de Mesure

Element.SpanOverOnColumn=Couvrir une colonne

Element.SpanOverOnRow=Couvrir une ligne

Element.Direction.Horizontal=Horizontale

Element.Direction.Vertical=Verticale

Element.choice.before=Avant

Element.choice.after=Apr�s

Element.RowPageBreakInterval=Ligne intervalle de saut de page

Element.ColumnPageBreakInterval=Colonne intervalle de saut de page

Element.TagType=Type de balise

Method.onPrepare=A la pr�paration

Method.onCreate=A la cr�ation

Method.onRender=Au rendu

Method.onPageBreak=Au saut de page

###########################################################
# Crosstab exception
Error.CrosstabException.DUPLICATE_DIMENSION=L'�l�ment de dimension du cube ''{0}'' ne peut pas �tre appliqu� � un tableau crois� qui poss�de un doublon.

Error.CrosstabException.DUPLICATE_MEASURE=L'�l�ment de mesure du cube ''{0}'' ne peut pas �tre appliqu� � un tableau crois� qui poss�de un doublon.

Error.CrosstabException.DUPLICATE_LEVEL=L'�l�ment de niveau du cube ''{0}'' ne peut pas �tre appliqu� � un tableau crois� qui poss�de un doublon.

Error.CrosstabException.DIMENSION_NOT_FOUND=Impossible de trouver un affichage de dimension ''{0}'' dans le tableau crois�.

Error.CrosstabException.MEASURE_NOT_FOUND=Impossible de trouver un affichage de mesure ''{0}'' dans le tableau crois�.

Error.CrosstabException.LEVEL_NOT_FOUND=Impossible de trouver un affichage de niveau ''{0}'' dans le tableau crois�.

###########################################################
# Crosstab executor runtime error message
CrosstabReportItemQuery.error.crosstab.loading=Echec du chargement de l'�l�ment de tableau crois� � partir de l'�l�ment �tendu.

CrosstabReportItemQuery.error.query.building=Mod�le de tableau crois� non valide pour la g�n�ration de requ�te.

CrosstabReportItemQuery.error.register.empty.cell.value=Erreur lors de l'enregistrement de la valeur de cellule vide.

CrosstabQueryHelper.error.invalid.measure=Le tableau crois� contient une d�finition de mesure nulle ; ou alors la mesure sp�cifique "{0}" n''existe pas dans le cube qui lui est associ�.

CrosstabQueryHelper.error.invalid.dimension.row=La zone de ligne du tableau crois� contient une d�finition de dimension nulle ; ou alors la dimension sp�cifique "{0}" n''existe pas dans le cube qui lui est associ�.

CrosstabQueryHelper.error.invalid.level.row=La zone de ligne du tableau crois� contient une d�finition de niveau nulle ; ou alors le niveau sp�cifique "{0}" n''existe pas dans le cube qui lui est associ�.

CrosstabQueryHelper.error.invalid.dimension.column=La zone de colonne du tableau crois� contient une d�finition de dimension nulle ; ou alors la dimension sp�cifique "{0}" n''existe pas dans le cube qui lui est associ�.

CrosstabQueryHelper.error.invalid.level.column=La zone de colonne du tableau crois� contient une d�finition de niveau nulle ; ou alors le niveau sp�cifique "{0}" n''existe pas dans le cube qui lui est associ�.

BaseCrosstabExecutor.error.process.visibility=Une erreur s'est produite lors du traitement de la visibilit�.

BaseCrosstabExecutor.error.process.bookmark=Une erreur s'est produite lors du traitement des en-t�tes.

BaseCrosstabExecutor.error.process.headers=Une erreur s'est produite lors du traitement des en-t�tes.

BaseCrosstabExecutor.error.process.row.height=Une erreur s'est produite lors du traitement de la hauteur des lignes.

CrosstabCellExecutor.error.restor.data.position=Une erreur s'est produite lors de la restauration de la position des donn�es.

CrosstabGrandTotalRowExecutor.error.generate.child.executor=Une erreur s'est produite lors de la g�n�ration du module d'ex�cution enfant.

CrosstabGrandTotalRowExecutor.error.check.child.executor=Une erreur s'est produite lors de la v�rification de l'�tat du module d'ex�cution enfant.

CrosstabHeaderExecutor.error.reset.row.position=Une erreur s'est produite lors de la r�initialisation de la position du curseur de bord de ligne.

CrosstabGroupExecutor.error.close.executor=Une erreur s'est produite lors de la fermeture du module d'ex�cution de groupe.

CrosstabGroupExecutor.error.prepare.group=Une erreur s'est produite lors de la pr�paration des groupes enfants.

CrosstabGroupExecutor.error.check.child.executor=Une erreur s'est produite lors de la v�rification de l'�tat du module d'ex�cution enfant.

CrosstabHeaderRowExecutor.error.check.force.empty=Une erreur s'est produite lors de la v�rification de l'obligation d'�tat vide de la cellule en cours.

CrosstabHeaderRowExecutor.error.check.edge.end=Une erreur s'est produite lors de la v�rification de l'�tat de fin du bord de la cellule en cours.

CrosstabHeaderRowExecutor.error.retrieve.child.executor=Une erreur s'est produite lors de la r�cup�ration du module d'ex�cution enfant.

CrosstabMeasureHeaderRowExecutor.error.generate.child.executor=Une erreur s'est produite lors de la g�n�ration du module d'ex�cution enfant.

CrosstabMeasureHeaderRowExecutor.error.check.child.executor=Une erreur s'est produite lors de la v�rification de l'�tat du module d'ex�cution enfant.

CrosstabMeasureRowExecutor.error.generate.child.executor=Une erreur s'est produite lors de la g�n�ration du module d'ex�cution enfant.

CrosstabMeasureRowExecutor.error.check.child.executor=Une erreur s'est produite lors de la v�rification de l'�tat du module d'ex�cution enfant.

CrosstabReportItemExecutor.error.crosstab.loading=Echec du chargement de l'�l�ment de tableau crois� � partir de l'�l�ment �tendu.

CrosstabReportItemExecutor.error.generate.columns=Une erreur s'est produite lors de la g�n�ration des colonnes pour le tableau crois�.

CrosstabReportItemExecutor.error.prepare.children=Une erreur s'est produite lors de la pr�paration du module d'ex�cution enfant pour le tableau crois�.

CrosstabReportItemExecutor.error.invalid.cube.result=Le cube obtenu pour le tableau crois� est incorrect (=nul).

CrosstabRowExecutor.error.check.force.empty=Une erreur s'est produite lors de la v�rification de l'obligation d'�tat vide de la cellule en cours.

CrosstabRowExecutor.error.check.edge.start=Une erreur s'est produite lors de la v�rification de l'�tat de d�but du bord de la cellule en cours.

CrosstabRowExecutor.error.retrieve.child.executor=Une erreur s'est produite lors de la r�cup�ration du module d'ex�cution enfant.

CrosstabSubTotalRowExecutor.error.check.edge.start=Une erreur s'est produite lors de la v�rification de l'�tat de d�but du bord de la cellule en cours.

CrosstabSubTotalRowExecutor.error.retrieve.child.executor=Une erreur s'est produite lors de la r�cup�ration du module d'ex�cution enfant.

TableColumnGenerator.error.process.visibility=Une erreur s'est produite lors du traitement de la visibilit� des colonnes

TableColumnGenerator.error.process.column.width=Une erreur s'est produite lors du traitement de la largeur des colonnes.

CrosstabReportItemHandle.error.locate.column.cell=Erreur lors de la localisation de la cellule de tableau crois� appropri�e sur les colonnes

CrosstabReportItemHandle.error.locate.row.cell=Erreur lors de la localisation de la cellule de tableau crois� appropri�e sur les lignes

CrosstabReportItemHandle.error.set.column.width=Erreur lors de la d�finition de la largeur des colonnes du tableau crois�

CrosstabReportItemHandle.error.set.row.height=Erreur lors de la d�finition de la hauteur des lignes du tableau crois�

CrosstabReportItemHandle.msg.change.measure.direction=Modifier la direction de la mesure

CrosstabReportItemHandle.msg.insert.measure=Ins�rer une mesure

CrosstabReportItemHandle.exception.name.blank=Le nom de la mesure calcul�e est requis.

CrosstabReportItemHandle.exception.name.duplicate=Le nom de mesure indiqu� est d�j� utilis�. Deux noms ne peuvent pas �tre identiques.

MeasureViewHandle.info.aggregation.already.exist=L'agr�gation requise existe d�j�.

MeasureViewHandle.msg.add.aggregation=Ajouter l'agr�gation

LevelViewTask.msg.remove.subtotal=Supprimer le sous-total

LevelViewTask.msg.add.subtotal=Ajouter le sous-total

DimensionViewTask.msg.remove.level=Supprimer le niveau

DimensionViewTask.msg.insert.level=Ins�rer un niveau

MeasureViewTask.msg.remove.header=Supprimer l'en-t�te de mesure

MeasureViewTask.msg.add.header=Ajouter l'en-t�te de mesure

CrosstabViewTask.msg.add.dimension=Ajouter une dimension

CrosstabViewTask.msg.remove.dimension=Supprimer la dimension

CrosstabViewTask.msg.remove.grandtotal=Supprimer le total g�n�ral

CrosstabViewTask.msg.add.grandtotal=Ajouter le total g�n�ral

CrosstabReportItemTask.msg.add.grandtotal=Ajouter le total g�n�ral

CrosstabReportItemTask.msg.set.aggregate.function=D�finir la fonction d'agr�gation

CrosstabReportItemTask.msg.pivot.dimension=Faire pivoter la dimension

CrosstabReportItemTask.msg.insert.dimension=Ins�rer une dimension

CrosstabReportItemTask.msg.set.mirroredStartingLevel=D�finir le niveau de d�part de la mise en miroir

CrosstabReportItemTask.msg.pivot.crosstab=Faire pivoter le tableau crois�

CrosstabReportItemHandle.Error.HasNoCube=Le tableau crois� doit pouvoir acc�der � un cube.

CrosstabReportItemHandle.log.validate=validation(...)

CrosstabScriptHandler.error.javascript={0} � la ligne {1} du JavaScript :\r\n{2}\r\n

CrosstabScriptHandler.info.try.register.crosstab.javascript.content=Tentative d'enregistrement du contenu JavaScript du tableau crois�...

CrosstabScriptHandler.info.crosstab.javascript.content.registered=Le contenu JavaScript du tableau crois� a �t� enregistr� avec succ�s.

CrosstabScriptHandler.info.try.load.crosstab.java.handler=Tentative de chargement du gestionnaire d'�v�nements Java du tableau crois�...

CrosstabScriptHandler.info.crosstab.java.handler.loaded=Le gestionnaire d'�v�nements Java du tableau crois� [{0}] a �t� charg� avec succ�s.

CrosstabScriptHandler.info.invalid.crosstab.java.handler=Le gestionnaire d'�v�nements Java du tableau crois� [{0}] n'est pas une impl�mentation compatible.

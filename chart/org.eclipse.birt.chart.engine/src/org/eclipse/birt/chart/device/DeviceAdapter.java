/***********************************************************************
 * Copyright (c) 2004 Actuate Corporation.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/.
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 *
 * Contributors:
 * Actuate Corporation - initial API and implementation
 ***********************************************************************/

package org.eclipse.birt.chart.device;

import java.util.Locale;

import org.eclipse.birt.chart.computation.BIRTChartComputation;
import org.eclipse.birt.chart.computation.GObjectFactory;
import org.eclipse.birt.chart.computation.IChartComputation;
import org.eclipse.birt.chart.computation.IGObjectFactory;
import org.eclipse.birt.chart.event.ArcRenderEvent;
import org.eclipse.birt.chart.event.AreaRenderEvent;
import org.eclipse.birt.chart.event.ClipRenderEvent;
import org.eclipse.birt.chart.event.EventObjectCache;
import org.eclipse.birt.chart.event.ImageRenderEvent;
import org.eclipse.birt.chart.event.InteractionEvent;
import org.eclipse.birt.chart.event.LineRenderEvent;
import org.eclipse.birt.chart.event.OvalRenderEvent;
import org.eclipse.birt.chart.event.PolygonRenderEvent;
import org.eclipse.birt.chart.event.RectangleRenderEvent;
import org.eclipse.birt.chart.event.StructureChangeEvent;
import org.eclipse.birt.chart.event.TextRenderEvent;
import org.eclipse.birt.chart.event.TransformationEvent;
import org.eclipse.birt.chart.exception.ChartException;

import com.ibm.icu.util.ULocale;

/**
 * A no-op adapter implementation for the
 * {@link org.eclipse.birt.chart.device.IDeviceRenderer}interface definition.
 */
public abstract class DeviceAdapter extends EventObjectCache implements IDeviceRenderer {

	protected final static IGObjectFactory goFactory = GObjectFactory.instance();

	protected IChartComputation cComp = new BIRTChartComputation();

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IDeviceRenderer#setProperty(java.lang.String,
	 * java.lang.Object)
	 */
	@Override
	public void setProperty(String sProperty, Object oValue) {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#getGraphicsContext()
	 */
	@Override
	public Object getGraphicsContext() {
		// DO NOTHING IN NO-OP IMPL
		return null;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#getXServer()
	 */
	@Override
	public IDisplayServer getDisplayServer() {
		// DO NOTHING IN NO-OP IMPL
		return null;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#getLocale()
	 */
	@Override
	public final Locale getLocale() {
		return getULocale().toLocale();
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#getULocale()
	 */
	@Override
	public final ULocale getULocale() {
		final IDisplayServer ids = getDisplayServer();
		if (ids == null) {
			return ULocale.getDefault();
		}
		return ids.getULocale(); // ALREADY BEING CHECKED FOR NULL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#needsStructureDefinition()
	 */
	@Override
	public boolean needsStructureDefinition() {
		// THE NO-OP IMPLEMENTATION INDICATES THAT STRUCTURE DEFINITION
		// NOTIFICATIONS ARE NOT REQUIRED
		return true;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#before()
	 */
	@Override
	public void before() throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#after()
	 */
	@Override
	public void after() throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#dispose()
	 */
	@Override
	public void dispose() {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#setClip(org.eclipse.birt.
	 * chart.event.ClipRenderEvent)
	 */
	@Override
	public void setClip(ClipRenderEvent cre) {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawImage(org.eclipse.birt.
	 * chart.event.ImageRenderEvent)
	 */
	@Override
	public void drawImage(ImageRenderEvent ire) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawLine(org.eclipse.birt.
	 * chart.event.LineRenderEvent)
	 */
	@Override
	public void drawLine(LineRenderEvent lre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawRectangle(org.eclipse.
	 * birt.chart.event.RectangleRenderEvent)
	 */
	@Override
	public void drawRectangle(RectangleRenderEvent rre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#fillRectangle(org.eclipse.
	 * birt.chart.event.RectangleRenderEvent)
	 */
	@Override
	public void fillRectangle(RectangleRenderEvent rre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawPolygon(org.eclipse.birt
	 * .chart.event.PolygonRenderEvent)
	 */
	@Override
	public void drawPolygon(PolygonRenderEvent pre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#fillPolygon(org.eclipse.birt
	 * .chart.event.PolygonRenderEvent)
	 */
	@Override
	public void fillPolygon(PolygonRenderEvent pre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawArc(org.eclipse.birt.
	 * chart.event.ArcRenderEvent)
	 */
	@Override
	public void drawArc(ArcRenderEvent are) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#fillArc(org.eclipse.birt.
	 * chart.event.ArcRenderEvent)
	 */
	@Override
	public void fillArc(ArcRenderEvent are) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IPrimitiveRenderer#enableInteraction(org.
	 * eclipse.birt.chart.event.InteractionEvent)
	 */
	@Override
	public void enableInteraction(InteractionEvent ie) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawArea(org.eclipse.birt.
	 * chart.event.AreaRenderEvent)
	 */
	@Override
	public void drawArea(AreaRenderEvent are) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#fillArea(org.eclipse.birt.
	 * chart.event.AreaRenderEvent)
	 */
	@Override
	public void fillArea(AreaRenderEvent are) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawOval(org.eclipse.birt.
	 * chart.event.OvalRenderEvent)
	 */
	@Override
	public void drawOval(OvalRenderEvent ore) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#fillOval(org.eclipse.birt.
	 * chart.event.OvalRenderEvent)
	 */
	@Override
	public void fillOval(OvalRenderEvent ore) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#drawText(org.eclipse.birt.
	 * chart.event.TextRenderEvent)
	 */
	@Override
	public void drawText(TextRenderEvent tre) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IPrimitiveRenderer#applyTransformation(org.
	 * eclipse.birt.chart.event.TransformationEvent)
	 */
	@Override
	public void applyTransformation(TransformationEvent tev) throws ChartException {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IStructureDefinitionListener#changeStructure(
	 * org.eclipse.birt.chart.event.StructureChangeEvent)
	 */
	@Override
	public void changeStructure(StructureChangeEvent scev) {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * org.eclipse.birt.chart.device.IDeviceRenderer#presentException(java.lang.
	 * Exception)
	 */
	@Override
	public void presentException(Exception cexp) {
		// DO NOTHING IN NO-OP IMPL
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see org.eclipse.birt.chart.device.IDeviceRenderer#getMimeType()
	 */
	@Override
	public String getMimeType() {
		return null;
	}

	/**
	 * Convert current font to appropriate font for different output format(SWT,
	 * PNG, JPG, ...).
	 *
	 * @param fontFamily
	 * @return
	 * @since 2.3
	 */
	abstract protected String convertFont(String fontFamily);

	@Override
	public IChartComputation getChartComputation() {
		return cComp;
	}

	@Override
	public void setChartComputation(IChartComputation cComp) {
		this.cComp = cComp;
	}
}

/**
 * WebViewScreen.tsx
 *
 * Cross-platform full-screen content screen:
 *  • iOS / Android  → react-native-webview renders the HTML directly
 *  • Web            → Native RN ScrollView renders equivalent JSX
 *                     (no iframe / WebView dependency needed on web)
 *
 * Navigator setup (stack presented as modal so tab bar is hidden):
 *   <Stack.Screen
 *     name="WebView"
 *     component={WebViewScreen}
 *     options={{ headerShown: false, presentation: 'modal' }}
 *   />
 */

import React, { useCallback } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import content from './webViewContent.json';

// react-native-webview is only used on native; avoid the import on web
// to prevent bundler errors when the package isn't installed for web.
let WebView: React.ComponentType<any> | null = null;
if (Platform.OS !== 'web') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    WebView = require('react-native-webview').WebView;
}

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (kept in sync with the HTML CSS vars)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
    bg: '#fafaf8',
    surface: '#ffffff',
    text: '#1a1a18',
    muted: '#6b6b67',
    accent: '#2d6a4f',
    accentLight: '#d8f3e8',
    border: '#e8e8e4',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// HTML for native WebView (iOS + Android)
// ─────────────────────────────────────────────────────────────────────────────
const buildHtml = (body: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#fafaf8;--surface:#fff;--text:#1a1a18;--muted:#6b6b67;
      --accent:#2d6a4f;--al:#d8f3e8;--border:#e8e8e4;
      --serif:'DM Serif Display',Georgia,serif;
      --sans:'DM Sans',system-ui,sans-serif;
    }
    html{background:var(--bg)}
    body{
      font-family:var(--sans);color:var(--text);background:var(--bg);
      padding:32px 24px 72px;max-width:640px;margin:0 auto;
      font-size:15px;line-height:1.7;
      animation:up .4s ease both;
    }
    @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    .hero{margin-bottom:36px;padding-bottom:28px;border-bottom:1px solid var(--border)}
    .eyebrow{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
    h1{font-family:var(--serif);font-size:clamp(26px,6vw,36px);line-height:1.15;margin-bottom:14px}
    .sub{font-size:15px;color:var(--muted);line-height:1.65}
    .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .tag{font-size:13px;font-weight:500;color:var(--accent);background:var(--al);padding:5px 12px;border-radius:100px}
    section{margin-bottom:32px}
    h2{font-family:var(--serif);font-size:20px;margin-bottom:10px}
    p{color:var(--muted);margin-bottom:10px}p:last-child{margin-bottom:0}
    ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:8px}
    ul li{display:flex;align-items:flex-start;gap:10px;color:var(--muted)}
    ul li::before{content:'✓';color:var(--accent);font-weight:700;flex-shrink:0;margin-top:1px}
    ol{padding:0;counter-reset:s;display:flex;flex-direction:column;gap:24px}
    ol>li{list-style:none;counter-increment:s;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}
    ol>li h3{font-family:var(--serif);font-size:17px;margin-bottom:8px;display:flex;align-items:center;gap:10px}
    ol>li h3::before{content:counter(s,decimal-leading-zero);font-family:var(--sans);font-size:11px;font-weight:500;color:var(--accent);background:var(--al);padding:3px 8px;border-radius:100px;flex-shrink:0}
    ol>li p,ol>li ul li{color:var(--muted);font-size:14px}
    ol>li ul{margin-top:8px;gap:6px}
    ol>li ul li::before{content:'·';font-size:18px;line-height:1}
    .card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;gap:14px;margin-top:12px}
    .card-icon{font-size:22px}
    .card-lbl{font-size:12px;color:var(--muted);margin-bottom:2px}
    .card-val{font-weight:500;color:var(--accent);font-size:14px}
    .badge{display:inline-block;font-size:12px;color:var(--muted);background:var(--border);padding:4px 10px;border-radius:100px;margin-bottom:20px}
    strong{color:var(--text)}
  </style>
</head>
<body>${body}</body>
</html>`;

const ABOUT_HTML = buildHtml(`
  <div class="hero">
    <div class="eyebrow">${content.about.eyebrow}</div>
    <h1>${content.about.title}</h1>
    <p class="sub">${content.about.sub}</p>
    <div class="tags">
      ${content.about.tags.map((tag) => `<span class="tag">${tag}</span>`).join('\n      ')}
    </div>
  </div>
  ${content.about.sections
      .map(
          (s) => `
  <section>
    <h2>${s.title}</h2>
    ${s.content ? `<p>${s.content}</p>` : ''}
    ${s.items ? `<ul>${s.items.map((item) => `<li>${item}</li>`).join('\n      ')}</ul>` : ''}
  </section>`
      )
      .join('')}
`);

const PRIVACY_HTML = buildHtml(`
  <div class="hero">
    <div class="eyebrow">${content.privacy.eyebrow}</div>
    <h1>${content.privacy.title}</h1>
    <p class="sub">${content.privacy.sub}</p>
  </div>
  <span class="badge">${content.privacy.badge}</span>
  <ol>
    ${content.privacy.items
        .map(
            (item) => `
    <li>
      <h3>${item.title}</h3>
      ${item.content ? `<p>${item.content}</p>` : ''}
      ${item.highlight ? `<p><strong>${item.highlight}</strong></p>` : ''}
      ${item.bullets ? `<ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : ''}
      ${
          item.card
              ? `
      <div class="card">
        <span class="card-icon">${item.card.icon}</span>
        <div><div class="card-lbl">${item.card.label}</div><div class="card-val">${item.card.value}</div></div>
      </div>`
              : ''
      }
    </li>`
        )
        .join('')}
  </ol>
`);

// ─────────────────────────────────────────────────────────────────────────────
// Web-platform native render  (no WebView / iframe needed)
// ─────────────────────────────────────────────────────────────────────────────
const Tag = ({ label }: { label: string }) => (
    <View style={web.tag}>
        <Text style={web.tagText}>{label}</Text>
    </View>
);

const CheckItem = ({ text }: { text: string }) => (
    <View style={web.checkRow}>
        <Text style={web.checkMark}>✓</Text>
        <Text style={web.checkText}>{text}</Text>
    </View>
);

const BulletList = ({ items }: { items: string[] }) => (
    <View style={{ gap: 6, marginTop: 8 }}>
        {items.map((item) => (
            <View key={item} style={web.checkRow}>
                <Text style={[web.checkMark, { color: C.muted, fontSize: 18, lineHeight: 20 }]}>
                    ·
                </Text>
                <Text style={[web.checkText, { fontSize: 14 }]}>{item}</Text>
            </View>
        ))}
    </View>
);

const PrivacyItem = ({
    num,
    title,
    children,
}: {
    num: string;
    title: string;
    children: React.ReactNode;
}) => (
    <View style={web.privacyCard}>
        <View style={web.privacyTitleRow}>
            <View style={web.numBadge}>
                <Text style={web.numText}>{num}</Text>
            </View>
            <Text style={web.privacyTitle}>{title}</Text>
        </View>
        {children}
    </View>
);

const WebAboutUs = () => (
    <ScrollView
        style={web.scroll}
        contentContainerStyle={web.content}
        showsVerticalScrollIndicator={false}
    >
        <View style={web.hero}>
            <Text style={web.eyebrow}>{content.about.eyebrow}</Text>
            <Text style={web.h1}>{content.about.title}</Text>
            <Text style={web.heroSub}>{content.about.sub}</Text>
            <View style={web.tags}>
                {content.about.tags.map((t) => (
                    <Tag key={t} label={t} />
                ))}
            </View>
        </View>

        {content.about.sections.map((s, idx) => (
            <View
                key={idx}
                style={[
                    web.section,
                    idx === content.about.sections.length - 1 && { marginBottom: 0 },
                ]}
            >
                <Text style={web.h2}>{s.title}</Text>
                {s.content && <Text style={web.p}>{s.content}</Text>}
                {s.items && s.items.map((item) => <CheckItem key={item} text={item} />)}
            </View>
        ))}
    </ScrollView>
);

const WebPrivacyPolicy = () => (
    <ScrollView
        style={web.scroll}
        contentContainerStyle={web.content}
        showsVerticalScrollIndicator={false}
    >
        <View style={web.hero}>
            <Text style={web.eyebrow}>{content.privacy.eyebrow}</Text>
            <Text style={web.h1}>{content.privacy.title}</Text>
            <Text style={web.heroSub}>{content.privacy.sub}</Text>
        </View>

        <View style={web.badge}>
            <Text style={web.badgeText}>{content.privacy.badge}</Text>
        </View>

        <View style={{ gap: 16 }}>
            {content.privacy.items.map((item) => (
                <PrivacyItem key={item.num} num={item.num} title={item.title}>
                    {item.content && <Text style={web.privacyBody}>{item.content}</Text>}
                    {item.highlight && (
                        <Text style={[web.privacyBody, { color: C.text, fontWeight: '500' }]}>
                            {item.highlight}
                        </Text>
                    )}
                    {item.bullets && <BulletList items={item.bullets} />}
                    {item.card && (
                        <View style={web.contactCard}>
                            <Text style={{ fontSize: 22 }}>{item.card.icon}</Text>
                            <View>
                                <Text style={web.contactLabel}>{item.card.label}</Text>
                                <Text style={web.contactValue}>{item.card.value}</Text>
                            </View>
                        </View>
                    )}
                </PrivacyItem>
            ))}
        </View>
    </ScrollView>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
const WebViewScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const { title } = route.params || { title: 'Page' };

    const handleClose = useCallback(() => navigation.goBack(), [navigation]);

    const htmlContent =
        title === 'About Us' ? ABOUT_HTML : title === 'Privacy Policy' ? PRIVACY_HTML : undefined;

    // ── Shared header ────────────────────────────────────────────────────────
    const Header = (
        <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 8 : 16 }]}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
                style={styles.closeBtn}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel="Close"
                accessibilityRole="button"
            >
                <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    // ── Web ──────────────────────────────────────────────────────────────────
    if (Platform.OS === 'web') {
        const WebContent =
            title === 'About Us' ? (
                <WebAboutUs />
            ) : title === 'Privacy Policy' ? (
                <WebPrivacyPolicy />
            ) : null;

        return (
            <View style={styles.container}>
                {Header}
                {WebContent ?? (
                    <View style={styles.center}>
                        <Text style={styles.soon}>Coming Soon</Text>
                    </View>
                )}
            </View>
        );
    }

    // ── iOS / Android ────────────────────────────────────────────────────────
    const fallbackHtml = `<html><body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;color:#999;background:#fafaf8">Coming Soon</body></html>`;

    return (
        <View style={styles.container}>
            {Header}
            {WebView ? (
                <WebView
                    source={{ html: htmlContent ?? fallbackHtml }}
                    style={styles.webview}
                    startInLoadingState
                    renderLoading={() => (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color={C.accent} />
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                    bounces={false}
                />
            ) : null}
        </View>
    );
};

export default WebViewScreen;

// ─────────────────────────────────────────────────────────────────────────────
// Styles — shared native + web
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: C.bg },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: C.border,
        backgroundColor: C.bg,
    },
    headerTitle: { fontSize: 15, fontWeight: '600', color: C.text, letterSpacing: -0.2 },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f0f0ec',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: { fontSize: 13, color: C.muted, fontWeight: '600' },
    webview: { flex: 1, backgroundColor: C.bg },
    loading: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: C.bg,
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    soon: { fontSize: 16, color: C.muted },
});

// ─────────────────────────────────────────────────────────────────────────────
// Styles — web-only ScrollView render
// ─────────────────────────────────────────────────────────────────────────────
const web = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: C.bg },
    content: { padding: 24, paddingBottom: 64, maxWidth: 640, alignSelf: 'center', width: '100%' },

    hero: {
        marginBottom: 36,
        paddingBottom: 28,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: C.accent,
        marginBottom: 12,
    },
    h1: { fontSize: 32, fontWeight: '400', color: C.text, lineHeight: 38, marginBottom: 14 },
    heroSub: { fontSize: 15, color: C.muted, lineHeight: 26 },
    tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
    tag: {
        backgroundColor: C.accentLight,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 100,
    },
    tagText: { fontSize: 13, fontWeight: '500', color: C.accent },

    section: { marginBottom: 32 },
    h2: { fontSize: 20, fontWeight: '400', color: C.text, marginBottom: 10 },
    p: { fontSize: 15, color: C.muted, lineHeight: 26 },

    checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 6 },
    checkMark: { color: C.accent, fontWeight: '700', fontSize: 14, marginTop: 2 },
    checkText: { color: C.muted, fontSize: 15, lineHeight: 24, flex: 1 },

    badge: {
        alignSelf: 'flex-start',
        backgroundColor: C.border,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 100,
        marginBottom: 20,
    },
    badgeText: { fontSize: 12, color: C.muted },

    privacyCard: {
        backgroundColor: C.surface,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 12,
        padding: 20,
    },
    privacyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
    numBadge: {
        backgroundColor: C.accentLight,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 100,
    },
    numText: { fontSize: 11, fontWeight: '500', color: C.accent },
    privacyTitle: { fontSize: 17, fontWeight: '400', color: C.text, flex: 1 },
    privacyBody: { fontSize: 14, color: C.muted, lineHeight: 22 },

    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginTop: 12,
        backgroundColor: C.surface,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 12,
        padding: 16,
    },
    contactLabel: { fontSize: 12, color: C.muted, marginBottom: 2 },
    contactValue: { fontSize: 14, fontWeight: '500', color: C.accent },
});
